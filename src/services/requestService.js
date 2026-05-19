import { getToken } from "../utils/authHelper";

const API_URL = import.meta.env.VITE_API_URL;

export const createRequest = async (request) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/requests/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
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

export const fetchRequests = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/requests/?action`, {
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
    });
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

export const updateRequestStatus = async (requestId, updateData, action) => {
  try {
    const token = await getToken()
    const response = await fetch(`${API_URL}/requests/${requestId}/${action}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        role:localStorage.getItem("userRole"),
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error("Failed to update request");
    }
    return { request: data.request, bookingId: data.bookingId };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const sendTextMessage = async (requestId, text) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/requests/send-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requestId, text }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error("Message not sent");
    }
    return data.data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const sendProposal = async (requestId,proposal)=>{
  try{
    const token = await getToken()
    const response = await fetch(`${API_URL}/requests/${requestId}/propose`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        role:localStorage.getItem("userRole"),
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(proposal)
    })
    const data = await response.json(response)
    return data.request
  }catch(err){
    console.error(err.message)
    throw err
  }
}

