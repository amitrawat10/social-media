import * as UserApi from "../api/userRequest";
export const updateUser = (id, userdata) => async (dispatch) => {
  dispatch({ type: "UPDATE_USER_START" });
  try {
    const { data } = await UserApi.updateUser(id, userdata);
    dispatch({ type: "UPDATE_USER_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATE_USER_FAIL" });
    console.log(error);
  }
};

export const followUser = (id, userdata) => async (dispatch) => {
  try {
    dispatch({ type: "FOLLOW_USER", data: id });
    await UserApi.followUser(id, userdata);
  } catch (error) {
    console.log(error);
  }
};
export const unfollowUser = (id, userdata) => async (dispatch) => {
  try {
    dispatch({ type: "UNFOLLOW_USER", data: id });
    await UserApi.unfollowUser(id, userdata);
  } catch (error) {
    console.log(error);
  }
};
