import _ from "lodash";

export const validateField = (fieldName, value, name) => {
  let error = "";
  switch (fieldName) {
    case "username":
      if (!value) {
        error = `Please enter ${fieldName}`;
      } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        error = "Invalid email address.";
      }
      return error;
    case "password":
      if (!value) {
        error = `Please enter ${fieldName}`;
      }
      return error;
    case "field":
      if (!value) {
        error = `Please enter ${name}`;
      }
      return error;
    case "attachment":
      if (!value) {
        error = `Please attach ${name}`;
      }
      return error;
    default:
      break;
  }
};

export const isAdminOrPr = (department) => {
  return ["Admin", "Procurement"].includes(department);
};

export const addStatus = (vendor, sectionName) => {
  let status =
    vendor.length && _.get(vendor[0][sectionName], "status", false)
      ? _.get(vendor[0][sectionName], "status", false)
      : "";
  if (status === "incomplete") {
    status = "under review";
  } else {
    status = "saved";
  }
  return status;
};



