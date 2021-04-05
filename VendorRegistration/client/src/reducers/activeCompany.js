const activeCompany =  (state = [], action) => {
  switch (action.type) {
    case "CHANGE_COMPANY":
      return {
        ...state,
        activeCompany:action.payload,
      };
      
    default:
      return {...state} ;
  }
};
export default activeCompany;