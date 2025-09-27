#!/usr/bin/env python3
import sys
import base64
import json
import logging
import sys
import os
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from mcp_server.server import DelphiOCRServer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TestOCRTool:

    def setup_method(self):
        self.server = DelphiOCRServer()

    def _load_test_image(self) -> str:
        test_image_path = os.path.join(os.path.dirname(__file__), "test.png")
        with open(test_image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode("utf-8")

    @pytest.mark.asyncio
    async def test_ocr_tool(self):
        test_image_base64 = self._load_test_image()
        test_arguments = {"images": {"test_sign": test_image_base64}}

        result = await self.server._handle_ocr_signs(test_arguments)
        response_data = json.loads(result.content[0].text)

        logger.info(f"Response: {response_data}")
        assert "results" in response_data
        assert "test_sign" in response_data["results"]

        logger.info("✅ Test passed!")
        return response_data
