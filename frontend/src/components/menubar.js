import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

export default function Menubar() {
  const { isOpen, setIsOpen } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const userdata = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Example usage to toggle isOpen
  };

  return (
    <div className="burger bg-primary-light dark:bg-primary-dark h_90 w_100 z-50 flex justify-center absolute right-0 ">
      <div className="buttons-menu flex w-fit mt-4 flex-col">
        <Link
          to={"/"}
          onClick={toggleMenu}
          className="m-1 px-5 py-2 rounded-full bg-secondary-light dark:bg-secondary-dark"
        >
          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
              <path
                fillRule="evenodd"
                d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-1">Home</span>
          </div>
        </Link>
        <Link
          to={"/about"}
          onClick={toggleMenu}
          className="m-1 px-5 py-2 rounded-full bg-secondary-light dark:bg-secondary-dark"
        >
          About
        </Link>
        <Link
          to={"/contact"}
          className="m-1 px-5 py-2 rounded-full bg-secondary-light dark:bg-secondary-dark"
        >
          Contact
        </Link>
        <Link
          to={user ? "/account" : "/login"}
          onClick={toggleMenu}
          className="user-menu flex m-1 p-1 rounded-full  dark:bg-secondary-dark bg-secondary-light justify-around"
        >
          <div className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {userdata ? (
            <div className="p-1">{userdata.user.name}</div>
          ) : (
            <div className="p-1">Login</div>
          )}
        </Link>
      </div>
    </div>
  );
}
