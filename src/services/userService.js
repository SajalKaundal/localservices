import { getToken } from "../utils/authHelper";

const API_URL = import.meta.env.VITE_API_URL;

export const updateUser = async (formData, addresses, deletedAddresses) => {
  try {
    const token = await getToken();
    const data = new FormData();
    if (formData.name) {
      data.append("name", formData.name);
    }
    if (formData.phone) {
      data.append("phone", formData.phone);
    }
    if (addresses.length > 0) {
      data.append("addresses", JSON.stringify(addresses));
    }
    if (deletedAddresses.length > 0) {
      data.append("deletedAddresses", JSON.stringify(deletedAddresses));
    }

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }
    const response = await fetch(`${API_URL}/user/me`, {
      method: "PATCH",

      headers: {
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const rdata = await response.json();
    if (!rdata.success) {
      throw new Error("Unable to update the profile");
    }

    return rdata.updatedUser;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const fetchTransactions = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/user/transactions`, {
      headers: {
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error("Unable to fetch transactions");
    }
    return data.transactions;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
