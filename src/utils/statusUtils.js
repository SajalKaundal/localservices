export const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return { bg: "rgba(245, 158, 11, 0.2)", text: "#FCD34D" };
    case "Negotiating":
      return { bg: "rgba(59, 130, 246, 0.2)", text: "#93C5FD" };
    case "Action Required":
      return { bg: "rgba(249, 115, 22, 0.2)", text: "#FDBA74" };
    case "Accepted":
      return { bg: "rgba(34, 197, 94, 0.2)", text: "#86EFAC" };
    case "Rejected":
      return { bg: "rgba(239, 68, 68, 0.2)", text: "#FCA5A5" };
    case "Expired":
      return { bg: "rgba(113, 113, 122, 0.2)", text: "#D4D4D8" };
    default:
      return { bg: "rgba(255, 255, 255, 0.1)", text: "#FFFFFF" };
  }
};
