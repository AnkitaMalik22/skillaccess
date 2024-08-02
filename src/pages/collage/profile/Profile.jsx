import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/collage/profile/Header";
import List from "../../../components/collage/profile/List";
import {
  getCollege,
  updateCollege,
  updateAvatar,
} from "../../../redux/collage/auth/authSlice";
import EditHeader from "../../../components/collage/profile/EditHeader";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.collageAuth);
  const [editing, setEditing] = useState(false);
  const [editable, setEditable] = useState(false);
  const [submitUpdateProfile, setSubmitUpdateProfile] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [college, setCollege] = useState(user);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    if (user) {
      setCollege(user);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (user && user.avatar && user.avatar.url) {
      setAvatar(user.avatar.url);
    }
  }, [user]);

  useEffect(() => {
    if (submitUpdateProfile) {
      //console.log(college.Phone.length);
      if (college.Phone.length !== 10) {
        setPhoneError(true);
        setSubmitUpdateProfile(false);
      } else {
        setPhoneError(false);
        setEditing(true);
        dispatch(updateAvatar({ avatar, id: user._id })).then(() => {
          setEditing(false);
        });
        dispatch(updateCollege(college)).then(() => {
          dispatch(getCollege());
        });
        setSubmitUpdateProfile(false);
        setEditable(false);
        localStorage.setItem("editable", "false");
      }
    }
  }, [submitUpdateProfile, college.Phone.length]);

  const handleUpdate = () => {
    if (college.Phone.length !== 10) {
      setPhoneError(true);
      toast.error("Invalid phone number!");
    } else {
      setPhoneError(false);
      setSubmitUpdateProfile(true);
    }
  };

  return (
    <>
      {user && editable && (
        <EditHeader
          editing={editing}
          editable={editable}
          setEditable={setEditable}
          handleUpdate={handleUpdate}
          college={college}
          setCollege={setCollege}
          setSubmitUpdateProfile={setSubmitUpdateProfile}
        />
      )}
      {user && (
        <Header
          editing={editing}
          editable={editable}
          setEditable={setEditable}
          handleUpdate={handleUpdate}
          college={college}
          setCollege={setCollege}
          setAvatar={setAvatar}
          avatar={avatar}
          phoneError={phoneError}
        />
      )}
      {!user && <h1>Loading...</h1>}
      <List editable={editable} setEditable={setEditable} />
    </>
  );
};

export default Profile;
