// import "css";
import LogoSearch from "../logoSearch/LogoSearch";
import InfoCard from "../infoCard/InfoCard";
import FollowersCard from "../followersCard/FollowersCard";
const ProfileLeft = () => {
  return (
    <div className="ProfileSection">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
