import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Login from "./pages/login";
import Register from "./pages/register";
import axios from "axios";
import { UserContexProvider } from "./userContext";
import Account from "./pages/account";
import Home from "./pages/home";
import AddIamge from "./pages/add_image";

axios.defaults.baseURL = "https://the-gallery-server.onrender.com/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContexProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addimage" element={<AddIamge />} />
        </Route>
      </Routes>
    </UserContexProvider>
  );
}

export default App;
