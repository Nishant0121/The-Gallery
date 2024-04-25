import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [setUser] = useState(null);

  const register = async (e) => {
    e.preventDefault();
    try {
      const userinfo = await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful");

      setUser(userinfo.data);
      setRedirect(true);
    } catch (error) {
      alert("Registration failed");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className=" h-full flex justify-center items-center">
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-t-light bg-transparent border-0 border-b-2 dark:border-t-dark border-t-light appearance-none dark:text-t-dark  dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-t-light dark:text-t-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-t-light bg-transparent border-0 border-b-2 dark:border-t-dark border-t-light appearance-none dark:text-t-dark  dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-t-light dark:text-t-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <button
          onClick={register}
          className="text-white m-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
        <Link to={"/login"}>Have an Account ? Login Here !</Link>
      </form>
    </div>
  );
}
