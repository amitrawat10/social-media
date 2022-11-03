import "./profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import PostSection from "../../components/postSection/PostSection";
import NavIcons from "../../components/navLinks/NavIcons";
import InfoCard from "../../components/infoCard/InfoCard";
import RightSection from "../../components/rightSection/RightSection";
const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="profile-center">
        <ProfileCard location="profilePage" />
        <div className="profile-infocard-sm">
          <InfoCard />
        </div>
        <PostSection location="profilePage" />
      </div>
      <RightSection />
      <div className="home-navicons">
        <NavIcons />
      </div>
    </div>
  );
};

export default Profile;
