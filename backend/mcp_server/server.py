import asyncio
import base64
import io
import json
import logging
from typing import Any, Dict

from PIL import Image

from mcp.server import Server
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.types import (
    CallToolResult,
    ListToolsResult,
    Tool,
    TextContent,
)

from .errors import ErrorCodes, ErrorMessages, create_error_response
from detection.image_recognition import get_info

logger = logging.getLogger(__name__)


class DelphiOCRServer:
    def __init__(self):
        self.server = Server("delphi-ocr")
        self._setup_handlers()

    def _setup_handlers(self) -> None:
        """Set up MCP server handlers"""

        @self.server.list_tools()
        async def list_tools() -> ListToolsResult:
            """List available tools"""
            return ListToolsResult(
                tools=[
                    Tool(
                        name="ocr_signs",
                        description="Extract text from images using OCR for blind/low-vision users",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "images": {
                                    "type": "object",
                                    "description": "Object with image keys and base64 values",
                                    "additionalProperties": {
                                        "type": "string",
                                        "description": "Base64 encoded image data"
                                    }
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
            if name == "ocr_signs":
                return await self._handle_ocr_signs(arguments)
            else:
                raise ValueError(f"Unknown tool: {name}")

    async def _handle_ocr_signs(
        self, arguments: Dict[str, Any]
    ) -> CallToolResult:
        validation_error = self._validate_ocr_request(arguments)
        if validation_error:
            return validation_error

        logger.info("Processing OCR request with valid image data")
        
        images = arguments.get("images", {})
        results = {}
        
        for image_key, image_data in images.items():
            # Decode base64 image
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            
            # Process with CV module - use output directly
            analysis_result = get_info(image)
            results[image_key] = analysis_result
        
        response = {"results": results}

        return CallToolResult(
            content=[TextContent(type="text", text=json.dumps(response))]
        )

    def _validate_ocr_request(
        self, arguments: Dict[str, Any]
    ) -> CallToolResult:
        if not arguments:
            return create_error_response(
                ErrorCodes.NO_ARGUMENTS, ErrorMessages.NO_ARGUMENTS
            )

        images = arguments.get("images")
        if not images:
            return create_error_response(
                ErrorCodes.NO_IMAGE_DATA, ErrorMessages.NO_IMAGE_DATA
            )

        for image_key, image_data in images.items():
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
