import asyncio
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
            """Handle tool calls"""
            if name == "ocr_signs":
                return await self._handle_ocr_signs(arguments)
            else:
                raise ValueError(f"Unknown tool: {name}")
    
    async def _handle_ocr_signs(self, arguments: Dict[str, Any]) -> CallToolResult:
        """Handle OCR signs tool call"""
        # TODO(sylvie): Call CV module for actual OCR processing

        placeholder_response = {
            "overview": "Quick overview under 10 seconds",
            "details": ["Detailed description under 30 seconds"],
        }
        
        return CallToolResult(
            content=[TextContent(type="text", text=json.dumps(placeholder_response))]
        )

    