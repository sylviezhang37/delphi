# delphi

NJIT GirlHacks 2025

What it does

A mobile app where a blind/low-vision user can capture a single photo, and the app will speak aloud any text (signs, flyers, labels) detected in the image.

⸻

Current Scope
• Capture a single image from phone camera.
• Send image to backend via MCP server.
• Backend runs OCR → extracts text.
• Return extracted text in JSON.
• App reads text aloud via TTS.

⸻

How Components Work Together

1. Frontend (React Native app)
   • Camera: lets user take a photo.
   • Networking: sends photo to backend MCP tool (ocr_signs).
   • Speech: converts JSON text results → audio (via expo-speech).

Input: user’s photo
Output: spoken text

⸻

2. Backend (MCP server)
   • MCP Tool (ocr_signs): exposed to frontend as a standard tool.
   • Orchestrator:
   • Receives image from frontend.
   • Preprocesses (resize/format).
   • Runs OCR (EasyOCR/Tesseract).
   • Packages results into clean JSON.

Input: image from frontend
Output: JSON { "texts": ["Free tutoring 5PM", "Exit"] }

⸻

3. CV Module (OCR)
   • Uses a pre-trained OCR engine.
   • Extracts text strings from the photo.
   • Returns plain strings.

⸻

User Flow 1. User opens app and captures an image 2. App takes photo → sends to backend 3. Backend OCR extracts text → returns JSON 4. App reads aloud: “Free tutoring 5PM, Room 101.”
