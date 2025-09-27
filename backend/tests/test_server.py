#!/usr/bin/env python3
"""
Test script for Delphi MCP Server
"""

import asyncio
import json
import logging
import sys
import os
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "mcp_server"))

from mcp_server.server import DelphiOCRServer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TestOCRTool:

    def setup_method(self):
        self.server = DelphiOCRServer()

    @pytest.mark.asyncio
    async def test_ocr_tool(self):
        test_arguments = {"image": "dGVzdF9pbWFnZV9kYXRh"}

        result = await self.server._handle_ocr_signs(test_arguments)

        response_text = result.content[0].text
        response_data = json.loads(response_text)

        logger.info(f"Response: {response_data}")
        assert "overview" in response_data
        assert "detail" in response_data

        logger.info("✅ OCR tool test passed!")
        return response_data
