
🛡️ Sentinel-MCP

Autonomous AI Compliance Auditor
Sentinel-MCP is a full-stack AI application that leverages the Model Context Protocol (MCP) to audit sensitive data. It uses a LangGraph ReAct agent to autonomously decide when to trigger security scans via a custom-built MCP server, providing real-time compliance feedback through a modern Next.js dashboard.

🚀 Technical Stack
AI Orchestration: LangGraph (Python)

Model: Mistral Large 3 (via Mistral AI API)

Protocol: Model Context Protocol (MCP)

Backend: FastAPI (Python)

Frontend: Next.js 15 (Tailwind CSS v4, TypeScript)

Environment: uv (Fast Python package manager)

🏗️ Architecture
Next.js UI: A high-end cybersecurity dashboard for user interaction.

FastAPI Bridge: Handles requests and streams agentic thoughts to the frontend.

LangGraph Agent: A ReAct agent that evaluates content and determines if the check_compliance tool is required.

Sentinel MCP Server: A specialized server that implements local security rules and logic, exposed via the Model Context Protocol.

🛠️ Installation & Setup
1. Prerequisites
Ensure you have uv installed (modern Python manager) and Node.js (v20+).

2. Backend Setup

```powershell
# Clone the repository
git clone https://github.com/mervinejo21/Sentinel-MCP.git
cd Sentinel-MCP

# Create environment and install dependencies
uv sync

# Setup Environment Variables
# Create a .env file and add:
MISTRAL_API_KEY=your_api_key_here
```

### 3\. Frontend Installation

Navigate to the UI directory:

```powershell
cd ui
npm install
```

## 🚥 running the Application

You must have **two separate terminals** running:

#### Terminal A: AI Agent Service (Backend)

```powershell
# From the root directory
uv run api.py
```

#### Terminal B: Web Dashboard (Frontend)

```powershell
# From the /ui directory
npm run dev
```

The application will be available at: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

## 🛡️ Security Capabilities

The system utilizes a custom MCP Server (`server.py`) to execute local security logic that never leaves your infrastructure:

  - **PII Detection:** Identifies potentially sensitive personal information.
  - **Credential Scanning:** Detects hardcoded passwords and secrets using pattern matching.
  - **Autonomous Reasoning:** The AI agent only triggers these tools when it perceives a potential compliance risk in the user's input.

## 📁 Project Structure

  - `/ui`: Next.js frontend application.
  - `server.py`: The MCP Server defining security tools.
  - `orchestrator.py`: The LangGraph agent logic.
  - `api.py`: FastAPI server for frontend-backend communication.
  - `.env`: Environment secrets (not tracked by git).

```
```
