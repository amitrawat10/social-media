import "./profileSection.css";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import FollowersCard from "../followersCard/FollowersCard";
const ProfileSection = () => {
  return (
    <div className="ProfileSection profile-left">
      <LogoSearch />
      <ProfileCard location="home" />
      <FollowersCard />
    </div>
  );
};

export default ProfileSection;
