import React from "react";
import PostSection from "../../components/postSection/PostSection";
import ProfileSection from "../../components/profile/ProfileSection";
import RightSection from "../../components/rightSection/RightSection";
import NavIcons from "../../components/navLinks/NavIcons";
import "./home.css";
const Home = () => {
  return (
    <div className="Home">
      <ProfileSection />
      <PostSection />
      <RightSection />
      <div className="home-navicons">
        <NavIcons />
      </div>
    </div>
  );
};

export default Home;
