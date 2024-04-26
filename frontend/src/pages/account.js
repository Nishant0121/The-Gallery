import React, { useState } from "react";
import axios from "axios";
import "ldrs/bouncy";

// Default values shown

export default function Account() {
  const [loading, setLoading] = useState(false);

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
      <button
        className=" bg-red-500 rounded-full px-2 py-0.5"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
      <div>
        {loading ? <div className=" text-center">Loading......</div> : ""}
      </div>
    </div>
  );
}
