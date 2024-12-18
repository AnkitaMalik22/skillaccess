import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/college/profile/Header";
// import List from "../../../components/college/profile/List";
import {
  getCollege,
  updateCollege,
  updateAvatar,
} from "../../../redux/college/auth/authSlice";
import EditHeader from "../../../components/college/profile/EditHeader";
// import useTranslate from "../../../hooks/useTranslate";
import toast from "react-hot-toast";
import { isUni } from "../../../util/isCompany";

const Profile = () => {
  //useTranslate();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.collegeAuth);
  // const { isAuthenticated } = useSelector((state) => state.universityAuth);
  const [editable, setEditable] = useState(false);
  const [submitUpdateProfile, setSubmitUpdateProfile] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [college, setCollege] = useState( user);
const [loading,setLoading] = useState(false);

  const handleUpdate =async () => {

  try {
    setLoading(true);
    if(avatar){
      await dispatch(updateAvatar({ avatar, id: user._id })).then((res)=>{
        console.log()
        setAvatar(res.payload.user.avatar.url)
      })
    }
   const userUpdate = await dispatch(updateCollege(college));
   
   setCollege(userUpdate.payload)
    setEditable(false);
    localStorage.setItem("editable", false);

  } catch (error) {
    console.log(error)
  } finally{
    setLoading(false)
  }
  };

// Fetch college data on mount
useEffect(() => {
  dispatch(getCollege()).then((res) => {
    // console.log(res)
    setCollege(res.payload.user);
  });
}, []);

// Update state when user changes
// useEffect(() => {
//   if (!user) {
//     console.log(user);
//     setCollege(user);
//   }
// }, [user]);

// Handle avatar updates
// useEffect(() => {
//   if (avatar ) {
//     setEditing(true);
//     dispatch(updateAvatar({ avatar, id: user._id }))
//       .finally(() => setEditing(false));
//   }
// }, [avatar, dispatch]);

  // useEffect(() => {
  //   if (user && user.avatar && user.avatar.url) {
  //     setAvatar(user.avatar.url);
  //   }
  //   if (avatar) {
  //     // if (college.Phone.length < 10) {
  //     //   toast.error("Invalid phone number !");
        
  //     //   return;
  //     // } else {
  //       setEditing(true);
  //       dispatch(updateAvatar({ avatar, id: user._id })).then(() => {});
  //       setEditing(false);
  //     // }
  //   }
  // }, [submitUpdateProfile]);
  
  // useEffect(() => {
  //   if (submitUpdateProfile) {

  //     if(!isUni() && college.Phone.length < 10){
  //       toast.error("Invalid phone number !");
  //       setSubmitUpdateProfile(false);
  //       return;
  //     }
  //     dispatch(updateCollege(college));
  //     // dispatch(getCollege());
  //     setSubmitUpdateProfile(false);
  //     setEditable(false);
  //     localStorage.setItem("editable", false);
  //   }
  // }, [submitUpdateProfile]);



  return (
    <>
      {user && editable && (
        <EditHeader
          loading={loading}
          
          editable={editable}
        
          handleUpdate={handleUpdate}
          
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
        />
      )}
      {!user && <h1> Loading ... </h1>}
      {/* <List editable={editable} setEditable={setEditable} /> */}
    </>
  );
};
export default Profile;