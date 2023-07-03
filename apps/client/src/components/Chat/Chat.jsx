import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chat.css";

export default function Chat({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //   useEffect(() => {
  //      const getFriends = async () => {
  //        const res = await axios.get("/users/friends/" + currentId);
  //        setFriends(res.data);
  //   };

  //      getFriends();
  //   }, [currentId]);

  //    useEffect(() => {
  //      setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  //  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_MESSAGES_API_URL + `/api/conversations/find/${currentId}/${user.id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              // src={
              //   o?.profilePicture
              //     ? PF + o.profilePicture
              //     : PF + "person/noAvatar.png"
              // }
              src = "https://iotorrino.com.br/wp-content/uploads/2021/04/no-avatar.png"

              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}