const user = (state = [], action) => {
  let key = 'user.userInfo'

  switch (action.type) {
    case "USER_INFO":
      return {
        ...state,
        token: action.payload.token,
        userInfo : action.payload.userInfo
      };
    case "LOGIN":
      return {
        ...state,
        loggedInStatus: action.payload,
      };
    case "UPDATE_USER_INFO":
      return {
        ...state,
        userInfo : action.payload
      };
    default:
      return { ...state };
  }
};

export default user;
