import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/company/profile/Header";
import List from "../../../components/college/profile/List";
// import {
//   getcompany,
//   updatecompany,
//   updateAvatar,
// } from "../../../redux/college/auth/authSlice";
import EditHeader from "../../../components/company/profile/EditHeader";
import useTranslate from "../../../hooks/useTranslate";
import toast from "react-hot-toast";
import { getCompanyDetails } from "../../../redux/features/company/companySlice";
import { getCompany,updateCompany ,uploadPicture } from "../../../redux/company/auth/companyAuthSlice";

const Profile = () => {
  //useTranslate();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const { data:user, isLoggedIn } = useSelector((state) => state.companyAuth);
  const [editable, setEditable] = useState(false);
  const [submitUpdateProfile, setSubmitUpdateProfile] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [company, setcompany] = useState(user);


  const handleUpdate = (company) => {
    dispatch(updateCompany(company));
    setEditable(false);
    localStorage.setItem("editable", false);
  };
  useEffect(() => {
    if (user) {
      setcompany(user);
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (user) {
      setcompany(user);
    } else {
      dispatch(getCompany());
    }
  }, [user]);

  useEffect(() => {
    if (user && user.avatar && user.avatar.url) {
      setAvatar(user.avatar.url);
    }
    if (avatar) {
      // if (company.Phone.length < 10) {
      //   toast.error("Invalid phone number !");
        
      //   return;
      // } else {
        setEditing(true);
        dispatch(uploadPicture({ avatar, id: user?._id })).then(() => {});
        setEditing(false);
      // }
    }
  }, [submitUpdateProfile]);
  
  useEffect(() => {
    if (submitUpdateProfile) {

      // if(company.Phone.length < 10){
      //   toast.error("Invalid phone number !");
      //   setSubmitUpdateProfile(false);
      //   return;
      // }
      dispatch(updateCompany(company));
      // dispatch(getCompany());
      setSubmitUpdateProfile(false);
      setEditable(false);
      localStorage.setItem("editable", false);
    }
  }, [submitUpdateProfile]);

  return (
    <>
      {user && editable && (
        <EditHeader
          editing={editing}
          editable={editable}
          setEditable={setEditable}
          handleUpdate={handleUpdate}
          company={company}
          setcompany={setcompany}
          setSubmitUpdateProfile={setSubmitUpdateProfile}
        />
      )}
      {user && (
        <Header
          editing={editing}
          editable={editable}
          setEditable={setEditable}
          handleUpdate={handleUpdate}
          company={company}
          setCompany={setcompany}
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