import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilSetting } from "@iconscout/react-unicons";
import { useNavigate, NavLink } from "react-router-dom";
import { UilCommentAltMessage } from "@iconscout/react-unicons";
import { UilEstate } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";
const NavIcons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navgiate = useNavigate();
  const handleHomeClick = () => {
    navgiate("/home");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <div className="navIcons">
      <UilEstate onClick={handleHomeClick} />
      <NavLink to="/chat">
        <UilCommentAltMessage />
      </NavLink>
      <UilSetting />
      <UilSignOutAlt onClick={handleLogout} />
    </div>
  );
};

export default NavIcons;
