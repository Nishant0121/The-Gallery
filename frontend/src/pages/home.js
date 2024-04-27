import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <Link
        className=" rounded-full bg-secondary-light dark:bg-secondary-dark px-2 py-1"
        to={"/addimage"}
      >
        Add Image
      </Link>
    </div>
  );
}
