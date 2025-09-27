"""
Error handling for Delphi MCP Server
"""

from typing import Dict, Any
from mcp.types import CallToolResult, TextContent
import json


class ErrorCodes:
    """MCP JSON-RPC 2.0 error codes"""
    
    # Standard JSON-RPC 2.0 error codes
    INVALID_REQUEST = -32600
    METHOD_NOT_FOUND = -32601
    INVALID_PARAMS = -32602
    INTERNAL_ERROR = -32603
    
    # Custom application error codes (-32000 to -32099)
    NO_ARGUMENTS = -32001
    NO_IMAGE_DATA = -32002
    INVALID_BASE64 = -32003
    OCR_PROCESSING_FAILED = -32004


class ErrorMessages:    
    NO_ARGUMENTS = "No arguments provided"
    NO_IMAGE_DATA = "No image data provided"
    INVALID_BASE64 = "Invalid base64 image data"
    OCR_PROCESSING_FAILED = "OCR processing failed"
    INTERNAL_ERROR = "Internal server error"


def create_error_response(error_code: int, error_message: str, data: Dict[str, Any] = None) -> CallToolResult:
    error_response = {
        "error": error_message,
        "overview": "",
        "detail": []
    }

    if data:
        error_response["data"] = data
    
    return CallToolResult(
        content=[TextContent(type="text", text=json.dumps(error_response))]
    )
