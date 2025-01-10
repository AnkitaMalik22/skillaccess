import "./App.css";
import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCollege } from "./redux/college/auth/authSlice";
import { useMediaQuery } from "./hooks/useMediaQuery";
import Loader from "./Loader";
import DesktopOnly from "./pages/common/DesktopOnly";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded components
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./pages/college/auth/Register"));
const TermsPolicies = lazy(() => import("./pages/college/auth/TermsPolicies"));
const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const NotAuth = lazy(() => import("./components/PopUps/NotAuth"));

// Route components
const CollegeRoutes = lazy(() => import("./routes/CollegeRoutes"));
const CompanyRoutes = lazy(() => import("./routes/CompanyRoutes"));
const UniversityRoutes = lazy(() => import("./routes/UniversityRoutes"));

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, USER_LOADING } = useSelector(
    (state) => state.collegeAuth
  );
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // useEffect(() => {
  //   dispatch(getCollege());
  // }, [dispatch]);

  if (USER_LOADING) {
    return <Loader />;
  }

  if (!isDesktop) {
    return <DesktopOnly />;
  }

  console.log("isLoggedIn:", isLoggedIn);

  return (
    <div className="app-content">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms&policies" element={<TermsPolicies />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/password/reset/:id" element={<ResetPassword />} />
          <Route path="/college/me/failed" element={<NotAuth />} />
          <Route
            path="/college/*"
            element={
              // <ProtectedRoute isAuthenticated={isLoggedIn} redirectPath="/">
                <CollegeRoutes />
              // </ProtectedRoute>
            }
          />
          <Route path="/company/*" element={<CompanyRoutes />} />
          <Route path="/university/*" element={<UniversityRoutes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
