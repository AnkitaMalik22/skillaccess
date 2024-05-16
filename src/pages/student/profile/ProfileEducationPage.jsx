import React from "react";
import StudentLayout from "../../../layout/Student";
import ProfileEducation from "../../../components/student/profile/Education/ProfileEducation";
const profileEducationPage = () => {
  return (
    <div>
      <StudentLayout>
        <ProfileEducation />
      </StudentLayout>
    </div>
  );
};

export default profileEducationPage;
