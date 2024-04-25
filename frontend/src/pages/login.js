import React, { useState, useContext, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../userContext"; // Corrected import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext); // Corrected typo in useContext

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setRedirect(true);
    }
  }, []); // Run once on component mount

  const login = async (e) => {
    e.preventDefault();
    try {
      const userinfo = await axios.post("/login", {
        email,
        password,
      });
      setUser(userinfo.data);
      localStorage.setItem("user", JSON.stringify(userinfo.data)); // Store user data in localStorage
      alert("login success");
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    }
  };

  if (redirect || user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form className="max-w-md mx-auto border rounded-lg dark:bg-purple-950 dark:text-white p-3 shadow-md">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          onClick={login}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <Link to="/register">Don't have an account? Register now!</Link>
      </form>
    </div>
  );
}
