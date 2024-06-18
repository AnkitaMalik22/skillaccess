import "./App.css";
import React, { Suspense, lazy, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCollege } from "./redux/collage/auth/authSlice";
import TestRoute from "./pages/collage/test/TestHome";
import ResultsRoute from "./pages/collage/results";
import QuesRoute from "./pages/collage/quesBank";
import StudentRoute from "./pages/collage/students";
import InboxRoute from "./pages/collage/inbox";
import SettingsRoute from "./pages/collage/settings";
import TeamsRoute from "./pages/collage/teams";
import Profile from "./pages/collage/profile/Profile";
import CompaniesRoute from "./pages/collage/companies";
import Loader from "./Loader";
import ForgotPassword from "./pages/collage/auth/ForgotPassword";
import ResetPassword from "./pages/collage/auth/ResetPassword";
import NotAuth from "./components/PopUps/NotAuth";
import AccountRoute from "./pages/collage/accounting/AccountRoutes";
import CollageLayout from "./layout/Collage";
import SecurityAppPage from "./pages/collage/settings/SecurityAppPage";
const Register = lazy(() => import("./pages/collage/auth/Register"));
const Login = lazy(() => import("./pages/collage/auth/Login"));
const TermsPolicies = lazy(() => import("./pages/collage/auth/TermsPolicies"));
const Dashboard = lazy(() => import("./pages/collage/dashboard/Dashboard"));

export default function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user, isLoggedIn, logoutError, USER_LOADING } = useSelector(
    (state) => state.collageAuth
  );
  const location = useLocation();
  const [paths, setPaths] = useState([
    /^\/$/, // Exact match for "/"
    /^\/register$/, // Exact match for "/register"
    /^\/terms&policies$/, // Exact match for "/terms&policies"
    /^\/forgotPassword$/, // Exact match for "/forgotPassword"
    /^\/password\/reset\/.*$/, // Match for "/password/reset/*"
    /^\/collage\/me\/failed$/, // Exact match for "/collage/me/failed"
    /^\/collage\/settings\/security\/securityApp$/, // Exact match for "/collage/settings/security/securityApp"
  ]);

  useEffect(() => {
    let shouldGetCollege = true;
    for (let i = 0; i < paths.length; i++) {
      const match = location.pathname.match(paths[i]);
      console.log(
        `Trying to match path: ${paths[i]} with pathname: ${location.pathname}`
      );
      console.log(`Match result: ${match}`);
      if (match) {
        shouldGetCollege = false;
        setLoader(false);
        break; // Exit loop early if a match is found
      }
    }
    if (shouldGetCollege) {
      dispatch(getCollege()).finally(() => {
        setLoader(false); // Ensure setLoader is defined or imported
      });
    }
  }, [dispatch]);
  useEffect(() => {
    console.log(logoutError);
    if (logoutError) {
      navigate("/");
    }
  }, [logoutError]);

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
      {isLoggedIn ? (
        <CollageLayout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <>
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
              <Route path="/collage/dashboard" element={<Dashboard />} />
              <Route path="/collage/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </CollageLayout>
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/collage/settings/security/securityApp"
              element={<SecurityAppPage />}
            />
            <Route path="/" element={<Login />} />
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
