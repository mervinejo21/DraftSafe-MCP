# 🛡️ DraftSafe: Autonomous AI Proofreader

**DraftSafe** is a professional-grade AI assistant designed to prevent "template embarrassment." It uses an **Agentic Reasoning** loop to scan outgoing drafts (Gmail, LinkedIn, etc.) for unfilled placeholders like `[Name]` or `<Company>`.

![Agentic Workflow](https://img.shields.io/badge/AI-Agentic-blueviolet)
![MCP Ready](https://img.shields.io/badge/Protocol-MCP-green)
![Next.js 15](https://img.shields.io/badge/Frontend-Next.js%2015-black)

## 🚀 Key Features

- **Autonomous Agentic Audit:** Powered by **LangGraph**, the system doesn't just scan text; it "reasons" about whether a tool-call is needed based on the context of your draft.
- **Chrome Extension (Real-time):** Directly integrates into Gmail and LinkedIn.
- **Auto-Scan on Paste:** Automatically triggers a security audit the moment you paste a template into a message body.
- **Model Context Protocol (MCP):** Uses the latest industry standards to separate the AI "Brain" from local security "Tools."
- **High-End Dashboard:** A sleek Next.js 15 interface with typewriter-style streaming and asynchronous state management.

## 🛠️ Technical Stack

- **AI Orchestration:** LangGraph, LangChain, Mistral Large 3.
- **Protocols:** MCP (Model Context Protocol).
- **Backend:** FastAPI (Asynchronous Python), Pydantic.
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Framer Motion.
- **Browser Integration:** Chrome Extension Manifest V3 (JavaScript).

## 📂 Project Structure

- `server.py`: The **MCP Server** hosting the core regex and scanning tools.
- `orchestrator.py`: The **LangGraph Agent** that manages the decision-making logic.
- `api.py`: The **FastAPI Bridge** connecting the browser to the AI engine.
- `draftsafe-extension/`: The **Chrome Extension** source code for browser integration.
- `page.tsx`: The **Next.js Dashboard** for manual audits.

## ⚙️ Installation & Usage

1. **Start the Backend:**
   ```bash
   python api.py
   ```

## 📸 Screenshots

### AI Dashboard

![DraftSafe Dashboard](./assets/dashboard.png)

### Chrome Extension in Action

![Extension Alert](./assets/extension-alert.png)
