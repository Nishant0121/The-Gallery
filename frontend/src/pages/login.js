import React, { useState, useContext, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading animation
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setRedirect(true);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation
    try {
      const userinfo = await axios.post("/login", {
        email,
        password,
      });
      setUser(userinfo.data);
      localStorage.setItem("user", JSON.stringify(userinfo.data));
      alert("login success");
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  if (redirect || user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-full flex justify-center items-center">
      {loading ? ( // Render loading animation if loading is true
        <div className="text-center">Loading...</div>
      ) : (
        <form className="max-w-md mx-auto border rounded-lg dark:bg-secondary-dark bg-secondary-light dark:text-t-dark text-t-light p-3 shadow-md">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-t-light bg-transparent border-0 border-b-2 dark:border-t-dark border-t-light appearance-none dark:text-t-dark  dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-t-light dark:text-t-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-t-light bg-transparent border-0 border-b-2 dark:border-t-dark border-t-light appearance-none dark:text-t-dark  dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-t-light dark:text-t-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <button
            onClick={login}
            className="text-white m-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <Link to="/register">Don't have an account? Register now!</Link>
        </form>
      )}
    </div>
  );
}
