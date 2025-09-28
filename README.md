# Delphi

**NJIT GirlHacks 2025 Project**

---

## What It Does

A mobile app where blind or low-vision users can capture photos to understand their environment. The app will announce the information detected in the image, and it could be used for a generic analysis of the surrounding, or help users get textual information from materials like flyers.

---

## Current Scope

- Capture a single image from the phone camera
- Send image to backend via MCP server
- Backend runs OCR via Gen AI → extracts descriptions
- Return extracted text in JSON
- App reads text aloud via TTS

---

## How Components Work Together

### 1. Frontend (React Native app)

- **Camera**: lets user take a photo
- **Networking**: sends photo to backend MCP server
- **Speech**: converts backend JSON output → audio
- **Accessibility**: announce new screen

**Input**: user’s photo  
**Output**: spoken text

---

### 2. Backend (MCP Server)

- **MCP Portal**: exposed to frontend as a standard tool
- **Gemini API**: converts image to text and output a high-level and a detailed description
