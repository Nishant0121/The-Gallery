import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Login from "./pages/login";
import Register from "./pages/register";
import axios from "axios";
import { UserContexProvider } from "./userContext";
import Account from "./pages/account";
require("dotenv").config();

const URL = process.env.BACKEND;
axios.defaults.baseURL = URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContexProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </UserContexProvider>
  );
}

export default App;
