import "./App.css";
import React, { Suspense, lazy, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Routes } from "react-router-dom";
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

import ProfilePage from "./pages/collage/profile/ProfilePage";
import CompaniesRoute from "./pages/collage/companies";
import Loader from "./Loader";
import ForgotPassword from "./pages/collage/auth/ForgotPassword";
import ResetPassword from "./pages/collage/auth/ResetPassword";
import NotAuth from "./components/PopUps/NotAuth";
import AccountRoute from "./pages/collage/accounting/AccountRoutes";
import { getCreditDetails } from "./redux/collage/dummySlice";
import CollageLayout from "./layout/Collage";
import { getCollege } from "./redux/collage/auth/authSlice";
import SecurityAppPage from "./pages/collage/settings/SecurityAppPage";

const Register = lazy(() => import("./pages/collage/auth/Register"));
const Login = lazy(() => import("./pages/collage/auth/Login"));
const TermsPolicies = lazy(() => import("./pages/collage/auth/TermsPolicies"));

export default function App() {
  const [loader, setLoader] = useState(true);
  //  AnkitaMalik22-ankita-dev
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user, isLoggedIn, logoutError, USER_LOADING } = useSelector(
    (state) => state.collageAuth
  );

  useEffect(() => {
    dispatch(getCollege()).finally(() => {
      setLoader(false);
    });
  }, [dispatch]);

  useEffect(() => {
    console.log(logoutError);
    if (logoutError) {
      navigate("/");
      // dispatch(clearLogoutError());
    }
  }, [logoutError]);
  // console.log(user, isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/") {
      navigate("/collage/dashboard");
    }
  }, [isLoggedIn, navigate]);

  if (loader || USER_LOADING) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      {/* <PopUpAdaptive/> */}

      {isLoggedIn ? (
        <CollageLayout>
          <Suspense fallback={<Loader />}>
            <Routes>
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
                {AccountRoute()}
              </>

              {/* <Route path="collage/accounting">
            <Route path="" element={<AccountingPage />} />
          </Route> */}

              <Route path="/collage/profile">
                <Route path="" element={<ProfilePage />} />
              </Route>

              {/* =============================== student routes ============================== */}

              {/* {StudentProfileRoutes()}
              {StudentTestRoute()}
              {StudentSettingsRoute()}
              {StudentJobsRoute()}
              {StudentDashRoute()}
              {StudentInboxRoute()}
              {StudentTestRoute()}
              {StudentResultsRoute()}
              {StudentCompaniesRoute()} */}
              {/* .......................................................................................................................... */}
            </Routes>
          </Suspense>
        </CollageLayout>
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* ------------------------------------- student --------------------------------------------------- */}

            {/* <Route path="/student" element={<RegisterStudent />} />
          <Route path="/student/login" element={<LoginStudent />} /> */}

            {/* ----------------------------------------collage-------------------------------------------------------------- */}
            <Route
              path="/collage/settings/security/securityApp"
              element={<SecurityAppPage />}
            />

            <Route path="" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms&policies" element={<TermsPolicies />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/password/reset/:id" element={<ResetPassword />} />
            <Route path="collage/me/failed" element={<NotAuth />} />
          </Routes>
        </Suspense>
      )}
    </React.Fragment>
  );
}
