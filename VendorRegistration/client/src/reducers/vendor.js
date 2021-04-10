const vendor =  (state = [], action) => {
    switch (action.type) {
      case "UPLOAD_LICENSE":
        return {
          ...state,
          vendors:action.payload,
        };
        case "ALL_VENDORS":
        return {
          ...state,
          vendors:action.payload,
        };
       
      default:
        return {...state} ;
    }
  };
  export default vendor;