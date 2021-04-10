export const getLinkStyle = (company) => {
  if (company.status !== "approved") {
    return {
      color: "currentColor",
      cursor: "notAllowed",
      opacity: "0.5",
      textDecoration: "none",
    };
  }
};
export const getDescOfApplication = (applicationType) => {
  if (applicationType === "VR") {
    return "Request for vendor Registration";
  }
};

export const getStatusOfApplication = (id, vendors) => {
  let vendorDetail = vendors && vendors.filter((ven) => ven._id === id);
  return vendorDetail[0].status;
};
