import { EXPO_PUBLIC_MCP_URL } from '@env';
const BASE_URL = EXPO_PUBLIC_MCP_URL || 'http://localhost:8000';
const OCR_ROUTE = '/mcp/tools/image_to_text';
const TIMEOUT_MS = 10000;

async function fetchJSON(url, opts = {}, timeoutMs = TIMEOUT_MS) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(url, { ...opts, signal: controller.signal });
        const text = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
        return text ? JSON.parse(text) : {};
    } finally {
        clearTimeout(t);
    }
}

class MCPService {
    constructor() {
        this.isConnected = false;
        this.imageKey = 0;
        console.log('MCP_URL', EXPO_PUBLIC_MCP_URL);
    }

    async connect() {
        this.isConnected = true;
        console.log('[MCP] connected to', BASE_URL);
    }

    async disconnect() {
        this.isConnected = false;
        console.log('[MCP] disconnected');
    }

    async processImages(imageObjects) {
        if (!this.isConnected) throw new Error('MCP not connected');

        const body = JSON.stringify({ images: imageObjects });

        const data = await fetchJSON(`${BASE_URL}${OCR_ROUTE}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        });

        return data;
    }

    async processSingleImage(imageBase64) {
        this.imageKey += 1;
        const key = String(this.imageKey);
        return this.processImages({ [key]: imageBase64 });
    }
}

const mcp = new MCPService();
export default mcp;

// --- quick test ---
// (async () => {
//   try {
//     await mcp.connect();

//     const fakeBase64 =
//       "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

//     const result = await mcp.processSingleImage(fakeBase64);
//     console.log("MCP response:", result);

//     await mcp.disconnect();
//   } catch (err) {
//     console.error("MCP test failed:", err);
//   }
// })();
