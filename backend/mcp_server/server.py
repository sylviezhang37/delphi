import asyncio
import base64
import json
import logging
from typing import Any, Dict

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
                                "image": {
                                    "type": "string",
                                    "description": "Base64 encoded image data"
                                }
                            },
                            "required": ["image"]
                        }
                    )
                ]
            )
        
        @self.server.call_tool()
        async def call_tool(name: str, arguments: Dict[str, Any]) -> CallToolResult:
            if name == "ocr_signs":
                return await self._handle_ocr_signs(arguments)
            else:
                raise ValueError(f"Unknown tool: {name}")
    
    async def _handle_ocr_signs(self, arguments: Dict[str, Any]) -> CallToolResult:
        """Handle OCR signs tool call"""
        validation_error = self._validate_ocr_request(arguments)
        if validation_error:
            return validation_error
        
        # TODO(sylvie): Call CV module for actual OCR processing
        logger.info("Processing OCR request with valid image data")
        
        placeholder_response = {
            "overview": "Quick overview under 10 seconds",
            "detail": ["Detailed description under 30 seconds"],
        }
        
        return CallToolResult(
            content=[TextContent(type="text", text=json.dumps(placeholder_response))]
        )
    
    def _validate_ocr_request(self, arguments: Dict[str, Any]) -> CallToolResult:
        if not arguments:
            return create_error_response(ErrorCodes.NO_ARGUMENTS, ErrorMessages.NO_ARGUMENTS)
        
        image_data = arguments.get("image")
        if not image_data:
            return create_error_response(ErrorCodes.NO_IMAGE_DATA, ErrorMessages.NO_IMAGE_DATA)
        
        if not self._is_valid_base64(image_data):
            return create_error_response(ErrorCodes.INVALID_BASE64, ErrorMessages.INVALID_BASE64)
        
        return None  # No errors
    
    def _is_valid_base64(self, data: str) -> bool:
        try:
            base64.b64decode(data, validate=True)
            return True
        except Exception:
            return False

    