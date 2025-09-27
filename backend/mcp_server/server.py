import base64, io, os, json, logging
from typing import Any, Dict

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from PIL import Image

from mcp.server import Server
from mcp.types import CallToolResult, ListToolsResult, Tool, TextContent

from .errors import ErrorCodes, ErrorMessages, create_error_response
from gemini.image_recognition import get_info

logger = logging.getLogger(__name__)


class DelphiOCRServer:
    def __init__(self):
        self.server = Server("delphi-ocr")
        self._setup_handlers()

    def _setup_handlers(self) -> None:
        @self.server.list_tools()
        async def list_tools() -> ListToolsResult:
            return ListToolsResult(
                tools=[
                    Tool(
                        name="image_to_text",
                        description="Extract text from images for blind/low-vision users",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "images": {
                                    "type": "object",
                                    "additionalProperties": {"type": "string"},
                                }
                            },
                            "required": ["images"],
                        },
                    )
                ]
            )

        @self.server.call_tool()
        async def call_tool(
            name: str, arguments: Dict[str, Any]
        ) -> CallToolResult:
            if name == "image_to_text":
                return await self._handle_ocr_signs(arguments)
            raise ValueError(f"Unknown tool: {name}")

    async def _handle_ocr_signs(
        self, arguments: Dict[str, Any]
    ) -> CallToolResult:
        if not os.getenv("GEMINI_API_KEY"):
            return create_error_response(
                ErrorCodes.INTERNAL_ERROR,
                "Configuration error: GEMINI_API_KEY not found",
            )

        validation_error = self._validate_ocr_request(arguments)
        if validation_error:
            return validation_error

        logger.info("Processing OCR request with valid image data")

        images = arguments.get("images", {})
        results = {}

        for image_key, image_data in images.items():
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            analysis_result = get_info(image)
            results[image_key] = analysis_result

        response = {"results": results}
        return CallToolResult(
            content=[TextContent(type="text", text=json.dumps(response))]
        )

    def _validate_ocr_request(
        self, arguments: Dict[str, Any]
    ) -> CallToolResult | None:
        if not arguments:
            return create_error_response(
                ErrorCodes.NO_ARGUMENTS, ErrorMessages.NO_ARGUMENTS
            )

        images = arguments.get("images")
        if not images:
            return create_error_response(
                ErrorCodes.NO_IMAGE_DATA, ErrorMessages.NO_IMAGE_DATA
            )

        for _, image_data in images.items():
            if not self._is_valid_base64(image_data):
                return create_error_response(
                    ErrorCodes.INVALID_BASE64, ErrorMessages.INVALID_BASE64
                )
        return None

    def _is_valid_base64(self, data: str) -> bool:
        try:
            base64.b64decode(data, validate=True)
            return True
        except Exception:
            return False


# ---- HTTP bridge (FastAPI) that reuses the MCP handler above ----
app = FastAPI()
mcp = DelphiOCRServer()


class OCRRequest(BaseModel):
    images: dict[str, str]


@app.post("/mcp/tools/image_to_text")
async def image_to_text(req: OCRRequest):
    result = await mcp._handle_ocr_signs(req.model_dump())
    
    try:
        block = result.content[0]
        if getattr(block, "type", None) == "text":
            return json.loads(block.text)
    except Exception as e:
        return JSONResponse(
            status_code=500, content={"error": f"Bridge unwrap failed: {e}"}
        )
    return JSONResponse(
        status_code=400, content={"error": "Unexpected MCP result shape"}
    )
