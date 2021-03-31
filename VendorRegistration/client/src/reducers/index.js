import { combineReducers } from "redux";
import ChangeTabs from "./ChangeTabs";

const appReducer = combineReducers({
  ChangeTabs,
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
