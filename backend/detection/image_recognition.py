import numpy as np
import os
from PIL import Image
from google import genai
from typing import Dict, Any, Union
import load_dotenv
import logging

def get_info(Image: str) -> Dict[str, str]:
  if './env'.exists():
    load_dotenv(dotenv_path='./env')
  else:
    logging.info("No backend/.env file found; continuing without loading local env")

  # gemini api key
  apikey = os.getenv('GOOGLE_API_KEY')
   
  client = genai.Client(api_key=apikey)`

  response = client.models.generate_content(
      model = 'gemini-2.5-flash',
      contents=[input_image, """
      Explain the contents like you're explaining it to a blind person, 
      imagine this will be read aloud to them (but do not mention this); 
      be considerate of their disability, considering tone and lengt. Section
      it in parts, an overview (specifically titled: Overview) and then subsections
      of said overview, but no more subsections that that. A depth of 1 if you
      can picture it (keep the overview under 25 words and the single subsection, named Details, under 70 words, this is 
      an absolute must!) 
      """],
      config={
        "response_mime_type": "application/json"
    },
  )
  
  return response.text