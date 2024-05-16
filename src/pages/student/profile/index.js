import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const Profile = lazy(() => import("./ProfilePage.jsx"));

const ProfilePersonalPage = lazy(() => import("./ProfilePersonalPage.jsx"));
const ProfileEducationPage = lazy(() => import("./ProfileEducationPage.jsx"));

const ProfileFinal = lazy(() => import("./ProfileFinalPage"));
const Skills = lazy(() => import("./SkillsPage"));
const Portfolio = lazy(() => import("./Portfolio"));

const ProfileRoutes = () => {
  return (
    <Route path="student/profile">
      <Route path="" element={<ProfilePersonalPage />} />
      <Route path="final" element={<ProfileFinal />} />
      <Route path="skills" element={<Skills />} />
      <Route path="portfolio" element={<Portfolio />} />
      {/* <Route path="personal" element={<ProfilePersonalPage />}></Route> */}
      <Route path="education" element={<ProfileEducationPage />}></Route>
    </Route>
  );
};

export default ProfileRoutes;
