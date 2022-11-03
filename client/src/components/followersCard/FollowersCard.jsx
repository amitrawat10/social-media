import "./followersCard.css";
import User from "../User/User";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/userRequest";

const FollowersCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();

      const peoples = data.filter(
        (single) => !single.followers.includes(user._id)
      );
      setPersons(peoples);
    };
    fetchPersons();
  }, [user._id]);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
    </div>
  );
};

export default FollowersCard;
