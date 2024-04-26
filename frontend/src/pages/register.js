import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading animation
  const [user, setUser] = useState(null);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation
    try {
      const userinfo = await axios.post("/register", {
        name,
        email,
        password,
      });
      setUser(userinfo.data);
      // localStorage.setItem("user", JSON.stringify(userinfo.data)); // Store user data in localStorage
      alert("Registration success");
      setRedirect(true);
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  if (redirect || user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-full flex justify-center items-center">
      {loading ? ( // Render loading animation if loading is true
        <div>Loading...</div>
      ) : (
        <form className="max-w-md mx-auto border rounded-lg dark:bg-secondary-dark bg-secondary-light dark:text-t-dark text-t-light p-3 shadow-md">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-t-light bg-transparent border-0 border-b-2 dark:border-t-dark border-t-light appearance-none dark:text-t-dark  dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-t-light dark:text-t-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          {/* Other input fields */}
          <button
            onClick={register}
            className="text-white m-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
          <Link to="/login">Have an Account? Login Here!</Link>
        </form>
      )}
    </div>
  );
}
