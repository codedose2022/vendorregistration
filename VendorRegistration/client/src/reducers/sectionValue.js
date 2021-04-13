const sectionValue = (state = [], action) => {
  switch (action.type) {
    case "SECTION_STATE":
      console.log("ghere", state);
      return {
        ...state,
        sectionName: [...state,action.payload],
      };
    default:
      return { ...state };
  }
};
export default sectionValue;
