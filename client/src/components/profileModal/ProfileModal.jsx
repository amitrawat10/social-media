// import "./profileModal.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/uploadAction";
import { useParams } from "react-router-dom";
import { updateUser } from "../../actions/userAction";

const ProfileModal = ({ modalOpened, setIsModalOpened, data }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  let { errorMsg, updateLoading } = useSelector((state) => state.authReducer);
  const param = useParams();
  const { password, ...userInfo } = data;
  const [formdata, setFormdata] = useState(userInfo);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profilePicture"
        ? setProfilePicture(img)
        : setCoverPicture(img);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = formdata;
    if (profilePicture) {
      const data = new FormData();
      const filename = Date.now() + "-" + profilePicture.name;
      data.append("name", filename);
      data.append("file", profilePicture);
      userData.profilePicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e);
      }
    }
    if (coverPicture) {
      const data = new FormData();
      const filename = Date.now() + "-" + coverPicture.name;
      data.append("name", filename);
      data.append("file", coverPicture);
      userData.coverPicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e);
      }
    }

    dispatch(updateUser(param.id, userData));
    setIsModalOpened(false);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="90%"
      opened={modalOpened}
      onClose={() => setIsModalOpened(false)}
    >
      <form className="infoForm modalForm" onSubmit={handleSubmit}>
        <h3>My information</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="First Name"
            name="firstname"
            value={formdata.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            className="infoInput"
            placeholder="Last Name"
            name="lastname"
            value={formdata.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Works At"
            name="worksAt"
            value={formdata.worksAt}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Lives In"
            name="livesIn"
            value={formdata.livesIn}
            onChange={handleChange}
          />
          <input
            type="text"
            className="infoInput"
            placeholder="Country"
            name="country"
            value={formdata.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Relationship Status"
            name="relationship"
            value={formdata.relationship}
            onChange={handleChange}
          />
        </div>
        <div className="edit-imgs-container">
          Profile Image
          <input type="file" name="profilePicture" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverPicture" onChange={onImageChange} />
        </div>
        <button className="button signup-btn" disabled={updateLoading}>
          {updateLoading ? "Saving.." : "Save"}
        </button>
        {errorMsg && (
          <span style={{ color: "red", fontSize: "11px" }}>{errorMsg}</span>
        )}
      </form>
    </Modal>
  );
};

export default ProfileModal;
