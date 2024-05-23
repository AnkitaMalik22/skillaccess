import React from "react";
import Profile from "../../../components/collage/profile/home/Profile";
import useTranslate from "../../../hooks/useTranslate";

const ProfilePage = () => {
  useTranslate();
  return <Profile />;
};

export default ProfilePage;
