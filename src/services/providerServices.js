import { getToken } from "../utils/authHelper";

const API_URL = import.meta.env.VITE_API_URL;

const fetchServices = async (_id = null) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/provider/services/?pid=${_id}`, {
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.services;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const fetchService = async (pid, sid) => {
  try {
    const response = await fetch(`${API_URL}/provider/${pid}/services/${sid}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error("Fetching Service Failed");
    }

    return data.service;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const addService = async (service) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/provider/services/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(service),
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

const deleteService = async (sid) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/provider/services/?sid=${sid}`, {
      method: "DELETE",
      headers: {
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Service not Deleted");
    }
    return data.deletedService;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const updateService = async (pid, sid, service) => {
  try {
    const response = await fetch(`${API_URL}/provider/${pid}/services/${sid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });
    const data = await response.json();
    return data.service;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const fetchProviderBookings = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/provider/bookings/`, {
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("userRole"),
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error("Unable to fetch Provder bookings");
    }

    return data.bookings;
  } catch (err) {
    console.error(err.message);
  }
};

const fetchProviderBooking = async (bookingId) => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${API_URL}/provider/booking?bookingId=${bookingId}`,
      {
        headers: {
          role: localStorage.getItem("userRole"),
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    if (!data.success) {
      throw new Error("Unable to Fetch Booking");
    }
    return data.booking;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const updateBookingStatus = async (bookingId,action) =>{
  try{
    const token = await getToken()
    const response = await fetch(`${API_URL}/provider/booking/update`,{
      method:'PATCH',
      headers:{
        "Content-Type":"application/json",
        role:localStorage.getItem("userRole"),
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        bookingId,action
      }) 
    })
    const data = await response.json()
    if(!data.success){
      throw new Error("Unable to Update the booking status")
    }
    return data.booking
  }catch(err){
    console.error(err.message)
    throw err
  }
}
export {
  fetchServices,
  addService,
  deleteService,
  fetchService,
  updateService,
  fetchProviderBookings,
  fetchProviderBooking,
  updateBookingStatus
};
