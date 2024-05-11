import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        // Fetch images based on user ID
        const res = await axios.get(`/images?userId=${userId}`);
        setImages(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchImages(); // Call fetchImages function
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const time = new Date(user.time).toLocaleString();

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2">
        <div className="img flex items-center justify-center">
          <Link to={user.profimgurl}>
            <img
              className="w-32 md:w-48 lg:w-56 h-32 md:h-48 lg:h-56 object-cover rounded-lg shadow-lg"
              src={user.profimgurl}
              alt="Bonnie"
            />
          </Link>
        </div>
        <div className="info ml-3 flex flex-col items-start overflow-scroll justify-center">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{time}</p>
        </div>
      </div>
      <>
        {images.length === 0 ? (
          <div>
            <h1>No images uploaded by user</h1>
          </div>
        ) : (
          <>
            <div className="m-2 p-2">Images Uploaded by user</div>
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
          </>
        )}
      </>
    </div>
  );
};

export default UserDetails;
