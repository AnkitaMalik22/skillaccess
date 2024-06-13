import React, { useEffect, useState } from "react";
import Header from "./Header";
import List from "./List";
import EditHeader from "./EditHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollege,
  updateCollege,
  updateAvatar,
  setUploadImg,
} from "../../../../redux/collage/auth/authSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn, uploadImg } = useSelector(
    (state) => state.collageAuth
  );
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

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

      // dispatch(getCollege());
    }
  }, [dispatch, isLoggedIn]);
  // useEffect(() => {
  //   // if (!user){
  //   dispatch(getCollege());
  //   console.log(college);
  //   // }
  //   // console.log(college, "college");
  // }, []);
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
      // dispatch(getCollege());
      // setCollege({ ...college, avatar: { url:user.avatar.url} });
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
    <div>
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
      {/* {window.location.reload(true)} */}
    </div>
  );
};
export default Profile;
