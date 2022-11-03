import * as PostApi from "../api/postRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "TIMELINE_POSTS_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "TIMELINE_POSTS_SUCCESS", data: data });
  } catch (e) {
    dispatch({ type: "TIMELINE_POSTS_FAIL" });
    console.log(e);
  }
};
