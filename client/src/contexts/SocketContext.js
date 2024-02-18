import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

// Create the socket context
const SocketContext = createContext();

// Create a custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

// Export the setupSocket function
export const setupSocket = () => {
  const token = localStorage.getItem("CC_Token");
  let newSocket = null; // Define newSocket variable

  if (token) {
    newSocket = io("http://localhost:4000", {
      query: {
        token: localStorage.getItem("CC_Token"),
      },
    });
  }

  return newSocket; // Return the socket instance
};

// Create the SocketProvider component to provide the socket context
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // Setup the socket when the component mounts
  useEffect(() => {
    setSocket(setupSocket());

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
