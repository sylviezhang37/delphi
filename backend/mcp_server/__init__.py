"""
Delphi MCP Server Package
"""

from .server import DelphiOCRServer, main
from .ocr_service import OCRService
from .types import OCRRequest, OCRResult, ImagePreprocessingConfig

__all__ = [
    "DelphiOCRServer",
    "main", 
    "OCRService",
    "OCRRequest",
    "OCRResult", 
    "ImagePreprocessingConfig"
]
