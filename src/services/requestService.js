const API_URL = import.meta.env.VITE_API_URL

export const createRequest = async (request) => {
  try {
    const response = await fetch(`${API_URL}/requests/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error("Request Not Created");
    }
    return data.request;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const fetchUserRequests = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/requests/${userId}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error("Failed to fetch requests");
    }
    return data.requests;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const updateRequestStatus = async (requestId, updateData) => {
  try {
    const response = await fetch(`${API_URL}/requests/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error("Failed to update request");
    }
    return data.request;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
