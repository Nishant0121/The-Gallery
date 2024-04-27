import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadImage() {
  const [image, setImage] = useState("");
  const [images, setImages] = useState(null);
  const [userId, setUserId] = useState(""); // State to store user ID

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

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId); // Append user ID to form data

    await axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  };
  console.log(images);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" name="image" onChange={onImageChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        {/* Render uploaded images */}
        {images == null ? (
          <div>No images uploaded</div>
        ) : (
          images.map((image, index) => (
            <div>
              <div key={index}>{image.image}</div>
              <img
                src={require(`../../../backend/images/${image.image}`)}
                alt=""
                srcset=""
                height={100}
                width={100}
              />
            </div>
          ))
        )}
      </div>
      <img
        src="../../../backend/uploads/myImage-1714148896755.jpg"
        alt=""
        srcset=""
      />
    </div>
  );
}

export default UploadImage;
