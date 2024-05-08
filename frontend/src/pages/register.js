import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(undefined);
  const [imgper, setImgPer] = useState(0);
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading animation
  const [user, setUser] = useState(null);

  useEffect(() => {
    image && uploadfile(image, "imageUrl");
  }, [image]);

  const uploadfile = async (file, type) => {
    const storage = getStorage(app);
    const folder = "profile/";
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPer(Math.round(progress)); //user ternery for video
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setInputs({ ...inputs, [type]: downloadURL });
          console.log(inputs);
        });
      }
    );
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation
    try {
      const userinfo = await axios.post("/register", {
        name,
        email,
        password,
        profimgurl: inputs.imageUrl,
      });
      setUser(userinfo.data);
      // localStorage.setItem("user", JSON.stringify(userinfo.data)); // Store user data in localStorage
      alert("Registration success");
      setRedirect(true);
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  if (redirect || user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-full flex justify-center items-center">
      {loading ? ( // Render loading animation if loading is true
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <motion.form
          className="max-w-md mt-10 m-2  rounded-lg dark:bg-secondary-dark bg-secondary-light dark:text-t-dark text-t-light p-3 shadow-lg"
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-t-light bg-transparent border-0 border-b-2 dark:border-t-dark border-t-light appearance-none dark:text-t-dark  dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-t-light dark:text-t-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-t-light bg-transparent border-0 border-b-2 dark:border-t-dark border-t-light appearance-none dark:text-t-dark  dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-t-light dark:text-t-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-t-light bg-transparent border-0 border-b-2 dark:border-t-dark border-t-light appearance-none dark:text-t-dark  dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-t-light dark:text-t-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload Profile Pic
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              accept="image/*"
              name="image"
              onChange={onImageChange}
            />
          </>
          <div className="flex items-center">
            <progress
              className="progress rounded-full bg-black dark:bg-white"
              value={imgper}
              max={100}
            ></progress>
            <spam>
              <p className=" mx-2">{imgper}%</p>
            </spam>
          </div>
          {imgper === 100 ? (
            <button
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
              onClick={register}
            >
              Register
            </button>
          ) : (
            ""
          )}
          <Link to="/login">Already have an Account? Login Here!</Link>
        </motion.form>
      )}
    </div>
  );
}
