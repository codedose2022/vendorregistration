
export const getLinkStyle = (company) => {
  if (company.status !== "approved") {
    return { 
      color: "currentColor",
       cursor: "notAllowed",
        opacity: '0.5',
        textDecoration: "none"};
  }
 
};

