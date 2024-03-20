import "./App.css";
import React, { Suspense, lazy } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollege, logoutCollage } from "./redux/collage/auth/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import Loader from "./Loader";
import ForgotPassword from "./pages/collage/auth/ForgotPassword";
import ResetPassword from "./pages/collage/auth/ResetPassword";

const Register = lazy(() => import("./pages/collage/auth/Register"));
const Login = lazy(() => import("./pages/collage/auth/Login"));
const TermsPolicies = lazy(() => import("./pages/collage/auth/TermsPolicies"));


export default function App() {
  //  AnkitaMalik22-ankita-dev
  const dispatch = useDispatch();

  // =======
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getCollege());
  //   }, [dispatch]);
  // >>>>>>> saveMain

  const { user, isLoggedIn } = useSelector((state) => state.collageAuth);

  useEffect(() => {
    dispatch(getCollege());
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ----------------------------------------collage-------------------------------------------------------------- */}
          <Route path="" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms&policies" element={<TermsPolicies/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/password/reset/:id" element={<ResetPassword />} />
          {/* <Route path="loader" element={<Loader />} /> */}

          {isLoggedIn ? (
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
          ) : (
            <Route path="*" element={<Loader />} />
          )}
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

          {isLoggedIn && (
            <Route path="collage/profile">
              <Route path="" element={<ProfilePage />} />
            </Route>
          )}

          {/* .......................................................................................................................... */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
