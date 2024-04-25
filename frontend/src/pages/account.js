import React from "react";
import axios from "axios";

export default function Account() {
  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axios.post("/logout");
      // Redirect to the login page or perform any other action after logout
      // For example, you can redirect to the login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
      // Handle logout failure if needed
    }
  };

  return (
    <div>
      <h1>Account</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
