import { getToken } from "../utils/authHelper";

const API_URL = import.meta.env.VITE_API_URL;

const fetchUserBookings = async (
  upComingBookings = false,
  pendingPayment = false,
) => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${API_URL}/user/bookings/?upComingBookings=${upComingBookings}&pendingPayment=${pendingPayment}`,
      {
        headers: {
          role: localStorage.getItem("userRole"),
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    if (!data.success) {
      throw new Error("Unable to fetch bookings");
    }
    return data.bookings;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const fetchServiceDetails = async (sid = undefined, pid) => {
  try {
    const token = await getToken();
    if (sid) {
      const response = await fetch(
        `${API_URL}/provider/service/?sid=${sid}&pid=${pid}`,
        {
          headers: {
            role: localStorage.getItem("userRole"),
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error("Unable to fetch service");
      }
      return [data.service];
    } else {
      const response = await fetch(`${API_URL}/provider/${pid}/services`, {
        headers: {
          role: localStorage.getItem("userRole"),
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error("Unable to fetch service");
      }
      return data.services;
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const createBooking = async (uid, booking) => {
  try {
    const response = await fetch(`${API_URL}/user/bookings/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error("Unable to Create a Booking");
    }

    return data.booking;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
export { fetchUserBookings, fetchServiceDetails, createBooking };
