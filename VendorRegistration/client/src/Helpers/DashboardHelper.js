export const getStyleForMenu = (company, activeCompany) => {
  if (company === activeCompany.activeCompany.companyName[0]) {
    return { backgroundColor: "#8080801c", color:"#00695c" };
  }
};

