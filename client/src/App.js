import "./App.css";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18px", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={user ? <Home /> : <Auth />} />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/auth" />}
        />
      </Routes>
    </div>
  );
};

export default App;
