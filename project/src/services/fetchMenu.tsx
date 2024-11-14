const apiKey: string | undefined = import.meta.env.VITE_API_KEY;

export async function fetchMenu() {
  if (apiKey) {
    try {
      const response: Response = await fetch(
        "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu",
        {
          method: "Get",
          headers: {
            "x-zocom": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("result ", result);

      return result.items || { error: "No items found in response" };
    } catch (error) {
      console.error("Fetch menu failed:", error);
      return { error: "Fetch failed" };
    }
  }

  return { error: "API key is missing" };
}
