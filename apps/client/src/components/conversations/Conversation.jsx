import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //console.log(PF);
  console.log('conversation: ',conversation)
  console.log('currentUser: ',currentUser)


  useEffect(() => {

    //console.log(conversation.members) //array com membros da conversa
  
    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const getUser = async () => {
      try {
        //console.log(friendId); id da outra pessoa da conversa
        const res = await axios.get(process.env.REACT_APP_MESSAGES_API_URL + "/api/users/?id=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src = {user?.image ? user?.image : "https://iotorrino.com.br/wp-content/uploads/2021/04/no-avatar.png"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}