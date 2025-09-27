#!/usr/bin/env python3
"""
Delphi MCP Server Runner
"""

import asyncio
import logging
import sys
import os

# Add the mcp_server directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'mcp_server'))

from mcp_server.server import DelphiOCRServer
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server

logger = logging.getLogger(__name__)


async def main() -> None:
    """Main server function"""
    logger.info("Starting Delphi MCP Server...")
    
    server = DelphiOCRServer()
    
    async with stdio_server() as (read_stream, write_stream):
        await server.server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="delphi-ocr",
                server_version="1.0.0",
                capabilities=server.server.get_capabilities(
                    notification_options=None,
                    experimental_capabilities=None,
                ),
            ),
        )


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())
    