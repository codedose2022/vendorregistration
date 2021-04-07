import React, {useState, useContext } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

const ValueContext = React.createContext();
const SetContext = React.createContext();
const HandleContext = React.createContext();

export function useValue(){
  return useContext(ValueContext);
}
export function useSet(){
  return useContext(SetContext);
}
export function useHandleChange(){
  return useContext(HandleContext);
}

export function TabsContext({ children }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [value, setValue] = useState(_.get(state, "ChangeTabs.selectedTab", 0));
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch({ type: "SIDEBAR_VENDOR_TABS_CHANGE", payload: newValue });
  };

  return (
    <ValueContext.Provider value={value}>
      <SetContext.Provider value={setValue}>
          <HandleContext.Provider value={handleChange}>
              {children}
          </HandleContext.Provider>
      </SetContext.Provider>
    </ValueContext.Provider>
  );
};
