export async function idFetch(
  itemIds: number[]
): Promise<{ id: string; eta: string; timestamp: string } | { error: string }> {
  const apiKey: string | undefined = import.meta.env.VITE_API_KEY;
  const apiId: string | undefined = import.meta.env.VITE_API_ID;

  if (apiKey && apiId) {
    try {
      const response = await fetch(
        `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${apiId}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-zocom": apiKey,
          },
          body: JSON.stringify({
            items: itemIds,
          }),
        }
      );
      const result = await response.json();
      console.log("order posted: ", result);
      if (result) {
        return {
          id: result.order.id,
          eta: result.order.eta,
          timestamp: result.order.timestamp,
        };
      } else {
        return { error: "Missing order ID or eta in response" };
      }
    } catch (error) {
      console.error("Post new order failed:", error);
      return { error: "Order failed" };
    }
  }

  return { error: "API id is missing" };
}
