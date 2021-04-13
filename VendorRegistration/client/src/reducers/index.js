import { combineReducers } from "redux";
import ChangeTabs from "./ChangeTabs";
import user from "./user";
import vendor from "./vendor";
import activeCompany from "./activeCompany";
import sectionValue from "./sectionValue";

const appReducer = combineReducers({
  ChangeTabs,
  user,vendor,
  activeCompany,sectionValue
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
