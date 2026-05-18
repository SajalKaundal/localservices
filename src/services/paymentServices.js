import { getToken } from "../utils/authHelper";

const API_URL = import.meta.env.VITE_API_URL;

const createOrder = async (id) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId: id }),
    });
    const data = await response.json();
    if (!data.success) {
      // console.log(order)
      throw new Error("Unable to process the transaction");
    }
    return data.order;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export { createOrder };
