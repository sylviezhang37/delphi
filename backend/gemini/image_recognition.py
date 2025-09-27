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
            Explain the contents like you're explaining it to a blind person, 
            imagine this will be read aloud to them (but do not mention this); 
            be considerate of their disability, considering tone and lengt. Section
            it in parts, an overview (specifically titled: Overview) and then subsections
            of said overview, but no more subsections that that. A depth of 1 if you
            can picture it (keep the overview under 25 words and the single subsection, named Details, under 70 words, this is 
            an absolute must!) 
            """,
        ],
        config={"response_mime_type": "application/json"},
    )

    return response.text
