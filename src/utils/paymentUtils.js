export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async ({ order, description, onSuccess }) => {
  const res = await loadRazorpayScript();

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return false;
  }

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  if (!razorpayKey) {
    alert("Missing Razorpay Key in .env");
    return false;
  }

  const options = {
    key: razorpayKey,
    currency: "INR",

    name: "LocalServe",
    description: description || "Service Payment",

    order_id: order.id,

    handler: function (response) {
      const transactionId = response.razorpay_payment_id;
      if (onSuccess) onSuccess(transactionId);
    },

    prefill: {
      name: "Test User",
      email: "test@example.com",
    },

    theme: {
      color: "#36f4a4",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  return true;
};
