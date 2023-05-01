import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/auth';
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import axios from "axios";
import { io } from "socket.io-client";


import "./messenger.css";

function Messenger() {

  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  //const [socket, setSocket] = useState(null);
  //const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef(null);
  var friendName = ""

  var qsToObj = function(qs) {
    qs = qs.substring(1);
    if (!qs) return {};    
    return qs.split("&").reduce(function(prev, curr, i, arr) {
      var p = curr.split("=");
      prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
      return prev;
    }, {});
  }

  //var qs = '?'; // window.location.search;
  var qs =  window.location.search;
  var ChosenChat = qsToObj(qs);
  delete ChosenChat.state;
  // if (ChosenChat.lenght === 0){
  //   console.log("A conversation was not chosen"); 
  // }else{
  //   console.log(ChosenChat); //{sellerId: '....', convId: '....'}
  // }


  useEffect(() => {
    socket.current = io(process.env.REACT_APP_MESSAGES_API_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        //console.log(user.id)
        const res = await axios.get(process.env.REACT_APP_MESSAGES_API_URL + "/api/conversations/" + user.id);
        console.log(res.data) // array de objetos de conversas, senda que cada umcontém um outro array "members" com os id's dos usuários
        setConversations(res.data);
        console.log(res.data)
        return res.data
      } catch (err) {
        console.log(err);
      }
      
    };
    getConversations().then( (response) =>{
      console.log(response.find(r => r.members[1] === ChosenChat.sellerId))
      console.log(conversations);
      setCurrentChat(response.find(r => r.members[1] === ChosenChat.sellerId))
    }

    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getMessages = async () => {
      
      console.log(conversations)
      console.log(currentChat)
      try {
        const res = await axios.get(process.env.REACT_APP_MESSAGES_API_URL + "/api/messages/" + currentChat?._id);
        setMessages(res.data);
        return res.data
      }
      catch (err) {
        console.log(err);
      } 
    };
    getMessages().then((response) =>{
      console.log(response);
    });
    console.log(messages)
  }, [currentChat]); // eslint-disable-line react-hooks/exhaustive-deps
 

  const handleSubmit = async (e) => {
    console.log(currentChat)
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.id
    );
    console.log(receiverId);

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(process.env.REACT_APP_MESSAGES_API_URL + "/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }


  };

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollToBottom();
    }
  }, [messages]);



  return (

    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" type="text"/> */}
            <h1>Chats</h1>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
          
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
          <h1>{friendName}</h1>
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : ChosenChat ? <>
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.sender === user.id} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </>
            :(
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Chat
              onlineUsers={onlineUsers}
              currentId={user.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>

    </>
    
);
}
export default Messenger;