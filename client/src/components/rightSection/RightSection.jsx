import { useState } from "react";
import "./rightSection.css";
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModal/ShareModal";
import NavIcons from "../navLinks/NavIcons";
const RightSection = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  return (
    <div className="RightSection">
      <NavIcons />
      <TrendCard />
      <button className="button r-btn" onClick={() => setIsModalOpened(true)}>
        Share
      </button>
      <ShareModal
        modalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
      />
    </div>
  );
};

export default RightSection;
