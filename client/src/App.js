import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom"; // No need for Link here
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Index from "./components/Index";
import ChatroomPage from "./components/ChatroomPage";
import { SocketProvider } from "./contexts/SocketContext"; // Import the SocketProvider
import { useSocket } from "./contexts/SocketContext"; // Import the useSocket hook

function App() {
  const socket = useSocket(); // Use the useSocket hook to access the socket

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
    element: (
      <SocketProvider> 
        <App />
      </SocketProvider>
    ),
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
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/chatroom/:id",
        element: <ChatroomPage />,
      },
    ],
  },
]);

export default App;
