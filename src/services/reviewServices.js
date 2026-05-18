import { getToken } from "../utils/authHelper";

const API_URL = import.meta.env.VITE_API_URL;

export const submitReview = async ({ bookingId, providerId, rating, comment }) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/user/booking/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId, providerId, rating, comment }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to submit review");
    }

    return data.review;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
