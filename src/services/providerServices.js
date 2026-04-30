const API_URL = import.meta.env.VITE_API_URL;

const fetchServices = async (_id) => {
  try {
    const response = await fetch(`${API_URL}/provider/${_id}/services`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.services;

  } catch (err) {
    console.error(err.message);
    throw err
  }
};

const addService = async (providerId, service) => {
  try {
    const response = await fetch(`${API_URL}/provider/${providerId}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(service)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to add service");
    }

    return data;

  } catch (err) {
    console.error(err.message);
    throw err; // important if caller needs to handle it
  }
};

export { fetchServices,addService };