# AI Agent Web Interface

A modern, responsive, and beautifully designed AI Chat interface built using standard web technologies (HTML, CSS, JS) and powered by a FastAPI backend integrated with Google's Gemini 2.5 Flash model.

## 🌐 Live Demo
Check out the live application here: [https://ai-agent-xtyt.onrender.com/](https://ai-agent-xtyt.onrender.com/)

## ✨ Features
- **Premium Glassmorphic UI**: Includes a clean, futuristic dark-mode aesthetic with backdrop blurs, soft lighting, and animated background orbs.
- **Dynamic Typing Effect**: Simulates a human-like typing experience as the AI responds.
- **Robust Markdown Parsing**: Automatically renders bold text, italics, inline code, and code blocks elegantly within chat bubbles.
- **FastAPI Backend**: A lightweight, lightning-fast Python backend using Uvicorn.
- **Docker Ready**: Includes a `Dockerfile` for effortless containerized deployment.
- **Zero Frontend Frameworks**: Just pure, highly optimized HTML, CSS, and Vanilla JavaScript.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- A Google Gemini API Key

### Local Setup

1. **Clone the repository and enter the directory**
   ```bash
   cd ai-agent-project
   ```

2. **Set up a Virtual Environment**
   ```bash
   python -m venv myvenv
   source myvenv/bin/activate  # On Windows, use `myvenv\Scripts\activate`
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Export your API Key**
   ```bash
   export GEMINI_API_KEY="your_actual_api_key_here"
   ```

5. **Start the Server**
   ```bash
   python -m uvicorn main:app --port 8000
   ```

6. **View the App**
   Open your browser and navigate to `http://localhost:8000`

---

## 🐳 Docker Setup

If you prefer using Docker, you can easily build and run the application in an isolated container.

**Build the image:**
```bash
docker build -t ai-agent .
```

**Run the container:**
*(Make sure to pass your Gemini API key as an environment variable)*
```bash
docker run -p 8000:8000 -e GEMINI_API_KEY="your_actual_api_key_here" ai-agent
```

You can then access the interface at `http://localhost:8000`.

---

## 📂 Project Structure

```text
ai-agent-project/
│
├── main.py              # FastAPI endpoint and static file server
├── requirements.txt     # Python dependencies
├── Dockerfile           # Docker container configuration
└── static/              # Frontend assets
    ├── index.html       # Application UI structure
    ├── style.css        # Glassmorphic and modern styling 
    └── script.js        # Logic for chat, typing animations, and API calls
```
