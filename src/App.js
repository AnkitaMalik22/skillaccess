import "./App.css";
import React, { Suspense, lazy } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLogoutError,
  getCollege,
  logoutCollage,
} from "./redux/collage/auth/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//----------------------------------------------collage pages----------------------------------------------------------------------------//

//-----------------------------------------dash
import Rote from "./pages/collage/home/DashRoutes";

//-----------------------------------------------auth

//-----------------------------------------------test
import TestRoute from "./pages/collage/test/Index";

//-----------------------------------------------------------results
import ResultsRoute from "./pages/collage/results";

//----------------------------------------------------------Q-Bank
import QuesRoute from "./pages/collage/quesBank";

//--------------------------------------------------------------companies

//---------------------------------------------------------------students
import StudentRoute from "./pages/collage/students";

//---------------------------------------------------------------inbox
import InboxRoute from "./pages/collage/inbox/index";

//---------------------------------------------------------------settings

import SettingsRoute from "./pages/collage/settings/index";

//---------------------------------------------------------------teams

import TeamsRoute from "./pages/collage/teams";

//----------------------------------------------------------------------------------------------------------------------------------------//

import AccountingPage from "./pages/collage/accounting/AccountingPage";

import ProfilePage from "./pages/collage/profile/ProfilePage";

import CompaniesRoute from "./pages/collage/companies";
import StudentCompaniesRoute from "./pages/student/companies";
import Loader from "./Loader";
import ForgotPassword from "./pages/collage/auth/ForgotPassword";
import ResetPassword from "./pages/collage/auth/ResetPassword";
import { Toaster } from "react-hot-toast";
import StudentProfileRoutes from "./pages/student/profile";
import StudentTestRoute from "./pages/student/test";
import StudentSettingsRoute from "./pages/student/settings";
import StudentJobsRoute from "./pages/student/jobs";
import StudentDashRoute from "./pages/student/dash";
import StudentInboxRoute from "./pages/student/inbox";
import StudentResultsRoute from "./pages/student/results";
import { use } from "i18next";
import { getStudent } from "./redux/student/auth/studentAuthSlice";
import NotAuth from "./components/PopUps/NotAuth";
import PopUpAdaptive from "./components/PopUps/PopUpAdaptive";

const Register = lazy(() => import("./pages/collage/auth/Register"));
const Login = lazy(() => import("./pages/collage/auth/Login"));
const TermsPolicies = lazy(() => import("./pages/collage/auth/TermsPolicies"));

const RegisterStudent = lazy(() => import("./pages/student/auth/Register"));
const LoginStudent = lazy(() => import("./pages/student/auth/Login"));

export default function App() {
  //  AnkitaMalik22-ankita-dev
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // =======
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getCollege());
  //   }, [dispatch]);
  // >>>>>>> saveMain

  const { user, isLoggedIn, logoutError, USER_LOADING } = useSelector(
    (state) => state.collageAuth
  );

  // useEffect(() => {
  //   dispatch(getCollege());
  // }, []);

  useEffect(() => {
    dispatch(getStudent());
  }, []);

  useEffect(() => {
    console.log(logoutError);
    if (logoutError) {
      navigate("/");
      // dispatch(clearLogoutError());
    }
  }, [logoutError]);

  // useEffect(() => {
  //   try {
  //     let scriptLoaded = false;

  //     let script = document.createElement("script");
  //     const loadGoogleTranslateScript = () => {
  //       if (!scriptLoaded) {
  //         script.src =
  //           "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //         script.async = true;
  //         script.onload = () => {
  //           window.googleTranslateElementInit = () => {
  //             new window.google.translate.TranslateElement(
  //               {
  //                 pageLanguage: "en",
  //                 includedLanguages: "en,hi,bn,ta,te,mr,gu,kn,ur,pa,ml,or", // Add more languages as needed
  //               },
  //               "google_translate_element"
  //             );
  //           };
  //         };

  //         document.body.appendChild(script);
  //         scriptLoaded = true;
  //       }
  //     };
  //     loadGoogleTranslateScript();
  //   } catch (error) {}

  //   // return () => {
  //   //   // Clean up script when component unmounts
  //   //   if (scriptLoaded) {
  //   //     document.body.removeChild(script);
  //   //     scriptLoaded = false;
  //   //   }
  //   // };
  // }, []);

  return (
    <React.Fragment>
      {/* <PopUpAdaptive/> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ------------------------------------- student --------------------------------------------------- */}

          <Route path="/student" element={<RegisterStudent />} />
          <Route path="/student/login" element={<LoginStudent />} />

          {/* ----------------------------------------collage-------------------------------------------------------------- */}

          <Route path="" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms&policies" element={<TermsPolicies />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/password/reset/:id" element={<ResetPassword />} />
          <Route path="collage/me/failed" element={<NotAuth />} />
          {/* <Route path="loader" element={<Loader />} /> */}

          <>
            {Rote()}
            {TestRoute()}
            {StudentRoute()}
            {QuesRoute()}
            {CompaniesRoute()}
            {ResultsRoute()}
            {InboxRoute()}
            {SettingsRoute()}
            {TeamsRoute()}
          </>

          {/* 
          {Rote()}
          {TestRoute()}
          {StudentRoute()}
          {QuesRoute()}
          {CompaniesRoute()}
          {ResultsRoute()}
          {InboxRoute()}
          {SettingsRoute()}
          {TeamsRoute()} */}

          <Route path="collage/accounting">
            <Route path="" element={<AccountingPage />} />
          </Route>

          <Route path="/collage/profile">
            <Route path="" element={<ProfilePage />} />
          </Route>

          {/* =============================== student routes ============================== */}

          {StudentProfileRoutes()}
          {StudentTestRoute()}
          {StudentSettingsRoute()}
          {StudentJobsRoute()}
          {StudentDashRoute()}
          {StudentInboxRoute()}
          {StudentTestRoute()}
          {StudentResultsRoute()}
          {StudentCompaniesRoute()}
          {/* .......................................................................................................................... */}
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}
