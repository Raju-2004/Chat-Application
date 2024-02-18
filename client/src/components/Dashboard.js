import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [chatrooms, setChatrooms] = useState([]);

  const getChatrooms = () => {
    fetch("http://localhost:4000/chatrooms", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CC_Token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch chatrooms");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setChatrooms(data); // Set the chatrooms state with the parsed data
      })
      .catch((err) => {
        console.error("Error fetching chatrooms:", err);
        setTimeout(getChatrooms, 3000);
      });
  };

  useEffect(() => {
    getChatrooms();
  }, []); // Fetch chatrooms when the component mounts

  return (
    <div className="flex items-center justify-center mt-52">
      <div className="flex flex-col items-center p-7 rounded-xl shadow-md">
        <div className="text-left font-bold text-3xl mb-6">
          <span className="text-sky-500 mr-2">Chat</span>Rooms
        </div>
        <div className="bg-gray-100 w-80 p-3 rounded-lg p-2 flex items-center mb-3">
          <input
            type="text"
            name="ChatroomName"
            placeholder="ChatroomName"
            className="bg-gray-100 outline-none text-sm flex-1"
          />
        </div>
        <button
          type="submit"
          className="border-2 mb-5 bg-sky-500 text-white rounded-lg px-12 py-2 inline-block font-semibold hover:bg-white hover:border-sky-500 hover:text-sky-500"
        >
          Create room
        </button>
        <div className="chatrooms w-full">
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="flex justify-between items-center mt-2 p-1">
              <div>{chatroom.Name}</div>
              <Link
                to={"/chatroom/" + chatroom._id}
                className="border-2 bg-sky-500 text-white rounded-lg px-6 py-2 inline-block font-semibold hover:bg-white hover:border-sky-500 hover:text-sky-500"
              >
                Join
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
