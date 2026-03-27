from fastapi import FastAPI
from fastapi.responses import FileResponse
from google import genai
import os

app = FastAPI()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Serve UI
@app.get("/")
def serve_ui():
    return FileResponse("static/index.html")

# AI Agent endpoint
@app.get("/agent")
def run_agent(query: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=query
    )
    return {"response": response.text}