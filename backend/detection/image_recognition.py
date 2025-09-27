import numpy as np
from google.colab import userdata
from PIL import Image
from google import genai
# gemini api key
apikey = userdata.get('GOOGLE_API_KEY')
client = genai.Client(api_key=apikey)

# example
# input_image = './girlhacks_poster.png'

# read input from MCP
def readInput():
  pass

# pass image into the a format where it can read it
input_image = Image.open(input_image)

# pass formatted image into gemini, for it to perform analysis and give info

def getInfo(Image):

  response = client.models.generate_content(
      model = 'gemini-2.5-flash',
      contents=[input_image, """
      Explain the contents like you're explaining it to a blind person, 
      imagine this will be read aloud to them (but do not mention this); 
      be considerate of their disability, considering tone and lengt. Section
      it in parts, an overview (specifically titled: Overview) and then subsections
      of said overview, but no more subsections that that. A depth of 1 if you
      can picture it (keep the overview under 40 words and each subsection under 70 words, this is 
      an absolute must!) 
      """]
  )
  
  return response.text

getInfo(input_image)
