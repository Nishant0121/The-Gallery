/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { Link } from "react-router-dom";

function UploadImage() {
  const [image, setImage] = useState(undefined);
  const [imgper, setImgPer] = useState(0);
  const [images, setImages] = useState([]);
  const [inputs, setInputs] = useState({});
  const [userId, setUserId] = useState(""); // State to store user ID

  useEffect(() => {
    image && uploadfile(image, "imageUrl");
  }, [image]);

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

  const uploadfile = async (file, type) => {
    const storage = getStorage(app);
    const folder = "images/";
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.imageUrl || !userId) {
      console.error("Image or user ID is missing.");
      return;
    }

    try {
      const response = await axios.post(
        "/upload",
        {
          imageUrl: inputs.imageUrl, // Send uploaded image URL
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      alert("Image uploaded successfully");
      setImages([...images, response.data]);
      window.location.reload();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <form className=" mx-3 mt-2" onSubmit={onSubmit}>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept="image/*"
            name="image"
            onChange={onImageChange}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            Upload Images Only
          </p>
        </div>

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
            type="submit"
          >
            Upload
          </button>
        ) : (
          ""
        )}
      </form>
      <div>
        Render uploaded images
        {images.length === 0 ? (
          <div>No images uploaded</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        )}
      </div>
    </div>
  );
}

export default UploadImage;
