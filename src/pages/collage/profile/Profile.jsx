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
import useTranslate from "../../../hooks/useTranslate";

const Profile = () => {
  useTranslate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.collageAuth);
  const [editable, setEditable] = useState(false);
  const [submitUpdateProfile, setSubmitUpdateProfile] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [college, setCollege] = useState(user);
  const handleUpdate = (college) => {
    dispatch(updateCollege(college));
    setEditable(false);
    localStorage.setItem("editable", false);
  };
  useEffect(() => {
    if (user) {
      setCollege(user);
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (user) {
      setCollege(user);
    } else {
      dispatch(getCollege());
    }
  }, [user]);

  useEffect(() => {
    if (user && user.avatar && user.avatar.url) {
      setAvatar(user.avatar.url);
    }
    if (avatar) {
      dispatch(updateAvatar({ avatar, id: user._id }));
    }
  }, [submitUpdateProfile]);
  useEffect(() => {
    if (submitUpdateProfile) {
      dispatch(updateCollege(college));
      dispatch(getCollege());
      setSubmitUpdateProfile(false);
      setEditable(false);
      localStorage.setItem("editable", false);
    }
  }, [submitUpdateProfile]);

  return (
    <>
      {user && editable && (
        <EditHeader
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
          editable={editable}
          setEditable={setEditable}
          handleUpdate={handleUpdate}
          college={college}
          setCollege={setCollege}
          setAvatar={setAvatar}
          avatar={avatar}
        />
      )}
      {!user && <h1> Loading ... </h1>}
      <List editable={editable} setEditable={setEditable} />
    </>
  );
};
export default Profile;
