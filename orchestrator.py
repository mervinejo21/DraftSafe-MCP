import asyncio
import os
from mcp import StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp import ClientSession
from langchain_mcp_adapters.tools import load_mcp_tools
from langgraph.prebuilt import create_react_agent
from langchain_mistralai import ChatMistralAI

async def main():
    if not os.getenv("MISTRAL_API_KEY"):
        print("❌ Error: MISTRAL_API_KEY is missing.")
        return

    server_params = StdioServerParameters(command="python", args=["server.py"])

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # 1. Load and Fix Tools (The Mistral 422 Fix)
            tools = await load_mcp_tools(session)
            for tool in tools:
                tool.response_format = "content" 

            # 2. Setup Agent
            model = ChatMistralAI(model="mistral-large-latest")
            agent = create_react_agent(model, tools)

            # 3. Stream the output so we see thoughts + results
            print("🤖 Sentinel is auditing...")
            inputs = {"messages": [("user", "Check if 'My password is 123' is safe.")]}
            
            try:
                async for chunk in agent.astream(inputs, stream_mode="values"):
                    final_msg = chunk["messages"][-1]
                
                print("\n" + "="*30)
                print(f"Final Result: {final_msg.content}")
                print("="*30)
            except Exception as e:
                print(f"⚠️ API Error: {e}. (Mistral might be having a temporary outage).")

if __name__ == "__main__":
    asyncio.run(main())