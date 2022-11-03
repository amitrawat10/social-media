const authReducer = (
  state = {
    authData: null,
    loading: false,
    errorMsg: null,
    error: false,
    updateLoading: false,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, errorMsg: null };
    case "AUTH_SUCCESS":
      // localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        loading: false,
        error: false,
        authData: action.data,
        errorMsg: null,
      };

    case "AUTH_FAIL":
      return { ...state, error: true, loading: false, errorMsg: action.data };

    case "UPDATE_USER_START":
      return { ...state, error: false, errorMsg: null, updateLoading: true };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        error: false,
        authData: action.data,
        errorMsg: null,
        updateLoading: false,
      };

    case "UPDATE_USER_FAIL":
      return {
        ...state,
        error: true,
        errorMsg: action.data,
        updateLoading: false,
      };

    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };
    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
        errorMsg: null,
      };
    default:
      return state;
  }
};

export default authReducer;
