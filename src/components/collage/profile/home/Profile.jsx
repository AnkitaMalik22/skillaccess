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
  // <<<<<<< AnkitaMalik22-ankita-dev
  const dispatch = useDispatch();
  const { user, isLoggedIn, uploadImg } = useSelector(
    (state) => state.collageAuth
  );
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem("editable");
    if (value === "true") {
      // setEditable(true);
    }
  }, []);

  const [submitUpdateProfile, setSubmitUpdateProfile] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [college, setCollege] = useState(user);
  const handleUpdate = (college) => {
    console.log("update");
    dispatch(updateCollege(college));
    setEditable(false);
    localStorage.setItem("editable", false);
  };
  useEffect(() => {
    if (user) {
      setCollege(user);
      dispatch(getCollege());
    }
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    // if (!user){
    dispatch(getCollege());
    console.log(college);
    // }
    // console.log(college, "college");
  }, []);
  useEffect(() => {
    if (user) {
      setCollege(user);
    } else {
      dispatch(getCollege());
    }
  }, [user]);
  //     dispatch(getCollege()).then((res) =>
  //       setCollege({
  //         CollegeName: res.payload.CollegeName || "college name ",
  //         Email: res.payload.Email || "email",
  //         Phone: res.payload.Phone || "phone",
  //         Address: res.payload.Address || "address",
  //         Website: res.payload.Website || "web",
  //         avatar: {
  //           public_id: res.payload.avatar?.public_id || "",
  //           url: res.payload.avatar?.url || "",
  //         },
  //         Description: res.payload.Description || "desc",
  //         Code: res.payload.code || "code",
  //         Location: res.payload.Location || "loc",
  //         State: res.payload.State || "state",
  //         City: res.payload.City || "city",
  //       })
  //     );
  //     console.log(user);
  //   }, []);
  useEffect(() => {
    if (user && user.avatar && user.avatar.url) {
      setAvatar(user.avatar.url);
    }
    if (avatar) {
      // const myForm = new FormData();
      // myForm.set("file", avatar);
      // console.log(myForm, "myform");
      dispatch(updateAvatar({ avatar, id: user._id }));
      dispatch(getCollege());
      // setCollege({ ...college, avatar: { url:user.avatar.url} });
    }
  }, [editable]);
  useEffect(() => {
    if (submitUpdateProfile) {
      dispatch(updateCollege(college));
      dispatch(getCollege());
      setSubmitUpdateProfile(false);
      setEditable(false);
      localStorage.setItem("editable", false);
    }
  }, [submitUpdateProfile]);
  // useEffect(() => {
  //   dispatch(getCollege());
  //   dispatch(setUploadImg(false))
  // }, [uploadImg]);
  // =======
  // const [editable, setEditable] = useState(false);
  console.log("submitprofile", submitUpdateProfile);
  return (
    <div className="px-8">
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
