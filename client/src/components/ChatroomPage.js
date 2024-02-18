import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";

const ChatroomPage = (props) => {
  console.log(props)
  const socket = props.socket;
  console.log(socket)
  const { ChatroomId } = useParams(); // Extract ChatroomId directly
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null); // Use ref for input element
  const [userId, setUserId] = React.useState("");
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        ChatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          ChatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  const sendMessage = () => {
    if (socket && messageRef.current.value) {
      socket.emit("chatroomMessage", {
        ChatroomId,
        message: messageRef.current.value,
        userId, // Include userId if available
      });
      messageRef.current.value = "";
    }
  };



  return (
    <main className="flex justify-center items-center">
      <div className="chatroomPage w-[700px] flex flex-col">
        <div className="chatroomSection flex flex-col h-full overflow-y-auto pt-4">
          <div className="cardHeader text-2xl font-bold text-center pt-4 pb-2">
            Chatroom Name
          </div>
          <div className="chatroomContent flex flex-col gap-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.sender + message.content}
                className={
                  message.userId === userId
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    message.userId === userId
                      ? "bg-blue-200 text-blue-700 rounded-lg p-2 px-4"
                      : "bg-gray-200 text-gray-700 rounded-lg p-2 px-4"
                  }
                >
                  <span className="text-md font-bold text-gray-800">
                    {message.sender}
                  </span>
                  : {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chatroomActions flex items-center px-4 pt-4">
          <input
            ref={messageRef} // Assign ref to input element
            type="text"
            name="message"
            placeholder="Say something..."
            className="flex-grow rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChatroomPage;
