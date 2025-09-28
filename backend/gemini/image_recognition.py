import sys
import os
from google import genai
from typing import Dict
from dotenv import load_dotenv

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "mcp_server"))

load_dotenv()


def get_info(image: str) -> Dict[str, str]:
    apikey = os.getenv("GEMINI_API_KEY")
    client = genai.Client(api_key=apikey)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            image,
            """
            You are an expert at describing images for blind users. 
            Use a thoughtful and respectful tone.

            Produce exactly two sections:
            1. "overview" – a short summary of the image (under 35 words).
            2. "details" – a longer explanation of the image (under 120 words).

            If you cannot confidently identify the image, set:
            "overview": "",
            "details": "",
            "readable": false

            Otherwise, set "readable": true.

            Always return a JSON object in this exact format:
            {
                "overview": "...",
                "details": "...",
                "readable": boolean
            }
            """,
        ],
        config={"response_mime_type": "application/json"},
    )

    return response.text
