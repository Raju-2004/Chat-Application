import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom"; // No need for Link here
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Index from "./components/Index";
import ChatroomPage from "./components/ChatroomPage";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import makeToast from "./Toaster";

// Define setSocket outside of the AppRouter component
let setupSocketInstance;
let socketInstance;

function App() {
  const [socket, setSocketState] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token.length > 0 && !socket) {
      const newSocket = io("http://localhost:4000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });
      newSocket.on('disconnect',()=>{
        setSocketState(null);
        setTimeout(setupSocket,5000);
        makeToast('error','Socket Disconnected')
      })
      newSocket.on('connect',()=>{
        makeToast('success','Socket Disconnected')
      })
      setSocketState(newSocket);
      // Update the socket state using the setSocketInstance function
      setupSocketInstance = setupSocket;
      socketInstance = newSocket;
    }
  };

  useEffect(() => {
    setupSocket();

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
        makeToast("warning", "Socket Disconnected");
        setSocketState(null);
      }
    };
  }, []); // Empty dependency array

  return (
    <>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
}

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Pass setSocketInstance as a prop to the App component
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login setupSocket={setupSocketInstance} />, // Pass setSocketInstance as a prop to the Login component
      },
      {
        path: "/dashboard",
        element: <Dashboard socket={socketInstance}/>,
      },
      {
        path: "/chatroom/:id",
        element: <ChatroomPage socket={socketInstance}/>,
      },
    ],
  },
]);

export default App;
