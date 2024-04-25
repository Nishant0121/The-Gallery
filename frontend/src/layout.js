import React from "react";
import Header from "./components/header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="m-2 ">
      <Header />
      <Outlet />
    </div>
  );
}
