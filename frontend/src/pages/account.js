import React, { useContext, useState } from "react";
import axios from "axios";
import "ldrs/bouncy";

import { UserContext } from "../userContext";

// Default values shown

export default function Account() {
  const [loading, setLoading] = useState(false);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      // Start loading animation
      setLoading(true);

      // Send a POST request to the logout endpoint
      await axios.post("/logout");
      // Redirect to the login page or perform any other action after logout
      // For example, you can redirect to the login page
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
      // Handle logout failure if needed
    } finally {
      // Stop loading animation
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Account</h1>
      <div className="flex items-center justify-center">
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          ""
        )}
      </div>

      {user ? (
        <div className=" flex items-center justify-center">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center mt-4 pb-10">
              <div
                className="flex items-center justify-center w-24 h-24 mb-3 rounded-full shadow-lg"
                alt=""
              >
                {userdata.user.profimgurl ? (
                  <img
                    className=" rounded-full w-full h-full object-cover"
                    src={userdata.user.profimgurl}
                    alt=""
                    srcset=""
                  />
                ) : (
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
                )}
              </div>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user ? <span>{userdata.user.name}</span> : "Please Login"}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user ? <span>{userdata.user.email}</span> : "Please Login"}
              </span>
            </div>
            <div className=" flex items-center justify-center">
              <button
                type="button"
                class="flex items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleLogout}
                disabled={loading}
              >
                <svg
                  className="w-6 h-6 mr-2 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"
                    clip-rule="evenodd"
                  />
                </svg>
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
