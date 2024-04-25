import React from "react";
import Header from "./components/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

export default function Layout() {
  return (
    <div className="p-2 h-screen dark:bg-primary-dark dark:text-t-dark bg-primary-light">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
