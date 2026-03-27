from fastapi import FastAPI
from fastapi.responses import FileResponse
from google import genai
import os

app = FastAPI()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

from fastapi.staticfiles import StaticFiles

# AI Agent endpoint
@app.get("/agent")
def run_agent(query: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=query

    )
    return {"response": response.text}

# Serve UI
app.mount("/", StaticFiles(directory="static", html=True), name="static")