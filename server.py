from fastmcp import FastMCP

#Create a server named "Sentinel"

mcp = FastMCP("Sentinel")

@mcp.tool()
def check_compliance(data: str) -> str:
    """Checks if the given data complies with the company's policies."""
    if "password" in data.lower():
        return "Data contains sensitive information. Compliance check failed."
    return "PASSED: Content is secure."

if __name__ == "__main__":
    mcp.run(transport="stdio")