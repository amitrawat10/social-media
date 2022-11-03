import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import { NavLink } from "react-router-dom";
import "./postShare.css";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
const PostShare = ({ location }) => {
  const dispatch = useDispatch();
  const descRef = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [errorText, setErrorText] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const onImageSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
  const handleFileInput = () => {
    imageRef.current.click();
  };

  const resetPostShare = () => {
    setImage(null);
    descRef.current.value = "";
  };

  const handleUpload = async (e) => {
    setErrorText("");
    if (descRef.current.value === "" && image == null) {
      setErrorText("Please enter post description or post a photo/video");
      return;
    }
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + "-" + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e);
      }
    }
    dispatch(uploadPost(newPost));
    resetPostShare();
  };
  return (
    location !== "profilePage" && (
      <div className="PostShare">
        <NavLink to={`/profile/${user._id}`}>
          <img
            src={
              user.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt="share-profile"
          />
        </NavLink>
        <div>
          <input type="text" placeholder="What's happening?" ref={descRef} />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={handleFileInput}
            >
              <UilScenery />
              Photo
            </div>
            <div className="option" style={{ color: "var(--video)" }}>
              <UilPlayCircle />
              Video
            </div>
            <div className="option" style={{ color: "var(--location)" }}>
              <UilLocationPoint />
              Location
            </div>
            <div className="option" style={{ color: "var(--shedule)" }}>
              <UilSchedule />
              Schedule
            </div>
            <button
              className="button share-btn"
              disabled={loading}
              onClick={handleUpload}
            >
              {loading ? "Sharing..." : "Share"}
            </button>
            <div style={{ display: "none" }}>
              <input type="file" ref={imageRef} onChange={onImageSelection} />
            </div>
          </div>
          {errorText && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
              }}
              className="post-share-err"
            >
              {errorText}
              <UilTimes
                style={{
                  cursor: "pointer",
                  backgroundColor: "#ddd",
                  marginLeft: ".123rem",
                  borderRadius: "50%",
                }}
                onClick={() => setErrorText("")}
              />
            </span>
          )}
          {image && (
            <div className="previewImg">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="preview-img" />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PostShare;
