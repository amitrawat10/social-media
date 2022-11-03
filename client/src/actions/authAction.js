import * as AuthApi from "../api/authRequests";
export const login = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.login(formData);
    navigate("../home", { replace: true });
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: "AUTH_FAIL", data: error.response.data.message });
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.register(formData);

    navigate("../home", { replace: true });
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({ type: "AUTH_FAIL", data: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
