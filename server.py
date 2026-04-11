import re

from fastmcp import FastMCP


mcp = FastMCP("Sentinel")


@mcp.tool()
def check_placeholders(text: str) -> str:
    """Scan text for unfilled placeholders such as [Name] or <Company>."""
    placeholders = re.findall(r"\[.*?\]|<.*?>", text)
    if placeholders:
        return f"FOUND UNFILLED TAGS: {', '.join(placeholders)}"
    return "CLEAR: No placeholders found."


if __name__ == "__main__":
    mcp.run(transport="stdio")