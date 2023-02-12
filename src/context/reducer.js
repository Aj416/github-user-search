import {
  SET_LOADING,
  SET_ERROR,
  SET_FOLLOWERS,
  SET_REPOS,
  SET_GITHUB_USER,
  SET_REQUEST_LIMIT,
} from "../action";

const reducer = (state, action) => {
  let updatedError;
  switch (action.type) {
    case SET_REQUEST_LIMIT:
      if (action.payload === 0) {
        updatedError = {
          show: true,
          msg: "sorry you have exceeded your daily rate limit !!!",
        };
        return { ...state, error: updatedError, requestLimit: action.payload };
      }
      return { ...state, requestLimit: action.payload };
    case SET_ERROR:
      updatedError = {
        show: action.payload.show,
        msg: action.payload.msg,
      };
      return { ...state, error: updatedError };
    case SET_GITHUB_USER:
      updatedError = {
        show: false,
        msg: "",
      };
      return { ...state, user: action.payload, error: updatedError };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_FOLLOWERS:
      return { ...state, followers: action.payload };
    case SET_REPOS:
      return { ...state, repos: action.payload };
    default:
      throw new Error(`no matching action type - "${action.type}"`);
  }
};

export default reducer;
