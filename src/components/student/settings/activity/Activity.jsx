import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import {
  getLoggedInUsers,
  logoutAUser,
  removeLoggedOutUser,
} from "../../../../redux/college/auth/authSlice";

const Activity = () => {
  const { loggedInUsers } = useSelector((state) => state.collegeAuth);
  const dispatch = useDispatch();
  const [place, setPlace] = useState("");
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    dispatch(getLoggedInUsers());
    fetchUserLocations();
  }, []);

  useEffect(() => {
    fetchUserLocations();
  }, [loggedInUsers]);

  const fetchUserLocations = async () => {
    if (loggedInUsers) {
      const locations = await Promise.all(
        loggedInUsers.map(async (user) => {
          const place = await getPlaceFromIp(user.ip);
          return place;
        })
      );
      setUserLocations(locations);
    }
    // setUserLocations(locations);
  };
  const handleDelete = (token) => {
    dispatch(removeLoggedOutUser(token));
  };

  const handleLogout = (token) => {
    dispatch(logoutAUser(token));
  };

  const getPlaceFromIp = async (ip) => {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    return data.city;
  };

  return (
    <>
      <Header />

      <div className="mt-20">
        <h1 className="text-lg font-bold mb-7">Where You’re Logged in</h1>

        {loggedInUsers?.map((user, index) => (
          <div
            key={index}
            className="w-1/2 bg-lGray bg-opacity-5 py-3 px-4 flex justify-between rounded-2xl mb-4"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 object-contain p-2">
                <img src="/images/icons/location.png" alt="" />
              </div>

              <div>
                <h1 className="text-lg font-bold">{userLocations[index]}</h1>
                <span className="flex gap-2">
                  <p className="text-green-500">
                    {user.token_deleted ? "Inactive" : "Active now"}
                  </p>

                  <p className="text-gray-400">This is {user.ip} </p>
                </span>
              </div>
            </div>

            <div className="self-center">
              {!user.token_deleted ? (
                <button
                  className="bg-[#DE350B33] bg-opacity-20 text-[#DE350B] py-1 px-2 rounded-lg text-sm font-medium"
                  onClick={() => handleLogout(user.token_id)}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="bg-lGray bg-opacity-20 text-gray-700 py-1 px-2 rounded-lg text-sm font-medium"
                  onClick={() => handleDelete(user.token_id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Activity;
