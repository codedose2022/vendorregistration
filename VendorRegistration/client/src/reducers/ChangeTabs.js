const ChangeTabs =  (state = [], action) => {
    switch (action.type) {
      case "SIDEBAR_VENDOR_TABS_CHANGE":
        return {
          ...state,
          selectedTab:action.payload,
        };
        case "SIDEBAR_MAINTABS_CHANGE":
          return {
            ...state,
            activeTab:action.payload,
          };
          case "DASHBOARD_TABS":
          return {
            ...state,
            currentTab:action.payload,
          };
      default:
        return {...state} ;
    }
  };
  export default ChangeTabs;