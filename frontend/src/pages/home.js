import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState("");
  const [images, setImages] = useState([]);

  const userdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch user ID from localStorage
        const userdata = JSON.parse(localStorage.getItem("user"));
        const userId = userdata.user._id;
        setUserId(userId);

        // Fetch images based on user ID
        const res = await axios.get(`/images?userId=${userId}`);
        setImages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages(); // Call fetchImages function
  }, []);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="home">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/*  */}
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16 ">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {userdata && user ? (
                <span>Hello {userdata.user.name} !!</span>
              ) : (
                "Hello User !!"
              )}
            </h2>

            <p className="mt-4 text-gray-950  dark:text-gray-200">
              An intuitive platform for users to effortlessly upload, store, and
              share images, ensuring high-quality preservation and secure
              access.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <Link
              className="block bg-secondary-light dark:bg-secondary-dark rounded-xl  p-4 shadow-md hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              to={user && userdata ? "/addimage" : "/login"}
              variants={item}
            >
              <span className="inline-block rounded-lg bg-gray-50 dark:bg-primary-dark p-3 shadow-lg">
                <svg
                  className="h-6 w-6"
                  dataSlot="icon"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
              </span>

              <h2 className="mt-2 font-bold">Add Image</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-200">
                Click to upload and share images.
              </p>
            </Link>

            <Link
              className="block bg-secondary-light dark:bg-secondary-dark rounded-xl  p-4 shadow-md hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              to="https://portfolio-nishant.vercel.app/"
              variants={item}
            >
              <span className="inline-block rounded-lg bg-gray-50 dark:bg-primary-dark p-3 shadow-md">
                <svg
                  className="h-6 w-6 "
                  dataSlot="icon"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              </span>

              <h2 className="mt-2 font-bold">About Developer</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-200">
                Discover the creator behind this platform.
              </p>
            </Link>
          </motion.div>
        </div>
        {/*  */}
      </div>
      <div>
        {images.length === 0 || userdata === null ? (
          <div></div>
        ) : (
          <div>
            <div className=" text-center font-bold m-2">
              Your Uploaded Images
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {images.map((data, index) => (
                <Link
                  to={data.imgurl}
                  className=" p-2 bg-secondary-light dark:bg-secondary-dark rounded-lg"
                >
                  <img
                    className=" rounded-lg"
                    key={index}
                    src={data.imgurl}
                    alt="Uploaded"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
