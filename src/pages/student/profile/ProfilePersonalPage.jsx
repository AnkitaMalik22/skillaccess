import React from "react";
import StudentLayout from "../../../layout/Student";
import ProfilePersonal from "../../../components/student/profile/Personal/ProfilePersonal";
const ProfilePersonalPage = () => {
  return (
    <div>
      <StudentLayout>
        <ProfilePersonal />
      </StudentLayout>
    </div>
  );
};

export default ProfilePersonalPage;
