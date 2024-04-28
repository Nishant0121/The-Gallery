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
      // Add the newly uploaded image to the images state
      setImages([...images, response.data]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={onImageChange}
        />
        <p>{imgper}%</p>
        {image === null ? (
          <div>No image selected</div>
        ) : (
          <img src={image} height={100} width={100} alt="" />
        )}
        <button type="submit">Upload</button>
      </form>
      <div>
        Render uploaded images
        {images.length === 0 ? (
          <div>No images uploaded</div>
        ) : (
          <div>
            {images.map((data, index) => (
              <img
                key={index}
                src={data.imgurl}
                height={100}
                width={100}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
