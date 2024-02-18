import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import makeToast from "../Toaster";

import { useNavigate } from "react-router-dom";
import "../App.css";
const SignUp = () => {

  const notify = (message, isError) => {
    if (isError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      console.log(data); // You can handle the response here
      navigate('/dashboard')
      makeToast("success","signup successful")
    } catch (error) {
      console.error("Error signing up:", error);
      navigate('/signup')
      makeToast("error","Signup fail")
    }
  };
  return (
    <div className="flex items-center justify-center mt-32">
      <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-3/5 p-5">
          <div className="text-left font-bold">
            <span className="text-sky-500">Company</span>Name
          </div>
          <div className="py-10">
            <h2 className="text-3xl ml-[107px] font-bold text-sky-500 mb-2">
              Sign Up to Account
            </h2>
            <div className="border-2 w-20 ml-[205px] border-sky-500 inline-block mb-2"></div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-80 rounded-lg p-2 flex items-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 m-2 h-6 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-80 rounded-lg p-2 flex items-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 m-2 h-6 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <input
                    type="text"
                    name="Email"
                    placeholder="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-80 rounded-lg p-2 flex items-center mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 m-2 h-6 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <input
                    type="text"
                    name="Password"
                    placeholder="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <button
                  type="submit"
                  className="border-2 bg-sky-500 text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:border-sky-500 hover:text-sky-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-2/5 bg-sky-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
          <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-2 text-left">
            Fill up Personal information and start Chat with us
          </p>
          <Link
            to="/Login"
            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-sky-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
