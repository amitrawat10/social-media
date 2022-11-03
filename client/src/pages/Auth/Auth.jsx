import "./auth.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import { register, login } from "../../actions/authAction";
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [arePasswordsMatched, setArePasswordsMatched] = useState(true);
  const { loading, errorMsg } = useSelector((state) => state.authReducer);

  const initalState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  };
  const [data, setData] = useState(initalState);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setData(initalState);
    setErrorText("");
    setArePasswordsMatched(arePasswordsMatched);
  };

  const handleSubmit = (e) => {
    setArePasswordsMatched(true);
    e.preventDefault();
    if (isSignup) {
      if (
        data.firstname === "" ||
        data.lastname === "" ||
        data.username === "" ||
        data.password === "" ||
        data.confirmpassword === ""
      ) {
        setErrorText("Please enter all fields.");
        return;
      }

      if (data.password !== data.confirmpassword) {
        setArePasswordsMatched(false);
        return;
      } else {
        setArePasswordsMatched(true);
        setErrorText("");
        // everything ok signup
        dispatch(register(data, navigate));
      }
    } else {
      if (data.username === "" || data.password === "") {
        setErrorText("Please enter both fields.");
        return;
      } else {
        setErrorText("");
        // everything ok login
        dispatch(login(data, navigate));
      }
    }
    if (errorMsg) setErrorText(errorMsg);
  };
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="logo" />
        <div className="webname">
          <h1>AppName</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignup ? "Register" : "Log in"}</h3>
          {isSignup && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="infoInput"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="infoInput"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignup && (
              <input
                type="password"
                name="confirmpassword"
                className="infoInput"
                placeholder="Confirm Password"
                value={data.confirmpassword}
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              fontWeight: "500",
              display: arePasswordsMatched ? "block" : "none",
            }}
          >
            {errorMsg}
          </span>
          <div className="btn-container">
            <button className="button signup-btn" disabled={loading}>
              {loading ? "please wait..." : isSignup ? "Sign up" : "Log in"}
            </button>
            <span
              className="already"
              style={{ cursor: "pointer", fontSize: "12px" }}
              onClick={() => {
                resetForm();
                setIsSignup((prev) => !prev);
              }}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account register here"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
