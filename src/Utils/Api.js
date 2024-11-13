export const ProductData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
  }
};
