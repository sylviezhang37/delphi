#!/usr/bin/env python3
import asyncio
import logging
import sys
import os
from pathlib import Path
from dotenv import load_dotenv

from mcp_server.server import DelphiOCRServer
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server

# Add the mcp_server directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "mcp_server"))


logger = logging.getLogger(__name__)


async def main():
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

    env_path = Path(__file__).resolve().parent / ".env"
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        logger.info("Loaded environment variables from .env")
    else:
        logger.warning(
            "No .env file found."
        )
        raise SystemExit(1)

    asyncio.run(main())
