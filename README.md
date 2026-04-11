# 🛡️ DRAFT.SAFE
### Autonomous AI Template Protection & Proofreading

**DRAFT.SAFE** is a full-stack AI application designed to solve the "Oops, I forgot to fill in the bracket" problem. It uses the **Model Context Protocol (MCP)** and **LangGraph** to autonomously scan AI-generated drafts for unfilled placeholders like `[Insert Name]` or `<Company>`, ensuring you never send an embarrassing template again.

---

## 🚀 Technical Stack

* **AI Orchestration:** [LangGraph](https://www.langchain.com/langgraph) (Python)
* **Model:** Mistral Large 3 (via Mistral AI API)
* **Protocol:** [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
* **Backend:** FastAPI (Python)
* **Frontend:** Next.js 15 (Tailwind CSS v4, TypeScript)
* **Environment:** `uv` (Fast Python package manager)

---

## 🏗️ Architecture

1.  **Next.js UI:** A high-end obsidian and purple dashboard with real-time "AI Thinking" animations.
2.  **FastAPI Bridge:** Handles requests and streams agentic thoughts from the Python backend to the frontend.
3.  **LangGraph Agent:** A ReAct agent that evaluates content and determines if the `check_placeholders` tool is required.
4.  **DraftSafe MCP Server:** A specialized server that uses regex logic to detect unfilled template tags locally.

---

## 🛠️ Installation & Setup

### 1. Prerequisites
Ensure you have `uv` installed (modern Python manager) and `Node.js` (v20+).

### 2. Backend Setup
From the root directory of the project:

```powershell
# Clone the repository
git clone [https://github.com/mervinejo21/Sentinel-MCP.git]
cd Sentinel-MCP

# Create environment and install dependencies
uv sync

# Setup Environment Variables
# Create a .env file and add your API key:
echo "MISTRAL_API_KEY=your_api_key_here" > .env

```

###3. Frontend Installation
In a new terminal, navigate to the UI directory:

```powerShell
cd ui
npm install
```
🚥 Running the Application
You must have two separate terminals running simultaneously:

Terminal A: AI Agent Service (Backend)
```powerShell
# From the root directory
uv run api.py
```
Terminal B: Web Dashboard (Frontend)
```powerShell
# From the /ui directory
npm run dev
```
The application will be available at: http://localhost:3000

##🛡️ **Core Capabilities**
The system utilizes a custom MCP Server (server.py) to execute local logic that identifies "Template Embarrassment" risks:

Placeholder Detection: Identifies [Bracketed], <Angle>, and INSERT HERE tags.

Autonomous Reasoning: The AI agent only triggers the scanner when it detects that the user is providing a draft template.

Typewriter Feedback: Results are streamed back to the right-hand panel with a modern typewriter effect.

##📁 **Project Structure**
/ui: Next.js frontend application with Black & Purple theme.

server.py: The MCP Server defining the scanning tools.

orchestrator.py: The LangGraph agent and AI reasoning logic.

api.py: FastAPI server for frontend-backend communication.

.env: Environment secrets (ignored by Git).
