import asyncio
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from mcp import StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp import ClientSession
from langchain_mcp_adapters.tools import load_mcp_tools
from langgraph.prebuilt import create_react_agent
from langchain_mistralai import ChatMistralAI

load_dotenv()

async def run_security_audit(user_input: str): # Keeping function name same to avoid breaking api.py
    if not os.getenv("MISTRAL_API_KEY"):
        return "Error: MISTRAL_API_KEY is missing."

    server_script = str(Path(__file__).with_name("server.py").resolve())
    server_params = StdioServerParameters(command=sys.executable, args=[server_script])

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await load_mcp_tools(session)
            
            for tool in tools:
                tool.response_format = "content" 

            model = ChatMistralAI(model="mistral-large-latest")
            
            system_modifier = (
                "You are 'DraftSafe', an expert email and text editor. "
                "Your job is to make sure users don't accidentally send AI-generated templates "
                "with placeholders like [Insert Name] or <Company Name> still in them. "
                "Always use the check_placeholders tool to scan the text." 
                "No need to send the corrected version back, just tell the user if you found any issues. "
                "Highlight what are the missing fields if you find any. If the text looks good, confirm that it's ready to send."
            )

            agent = create_react_agent(model, tools, prompt=system_modifier)
            inputs = {"messages": [("user", user_input)]}
            response = await agent.ainvoke(inputs)
            
            return response["messages"][-1].content