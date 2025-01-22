import "./App.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCollege } from "./redux/college/auth/authSlice";
import { useMediaQuery } from "./hooks/useMediaQuery";
import Loader from "./components/Loader";
import DesktopOnly from "./pages/common/DesktopOnly";
import ProtectedRoute from "./components/ProtectedRoute";
import { getEntity } from "./util/isCompany";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import useAccess from "./hooks/useAccess";
import AwaitingApproval from "./pages/company/AwatingApproval";
import RegisterCompany from "./pages/company/auth/RegisterCompany";
import RegisterUniversity from "./pages/university/auth/RegisterUniversity";

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

  const { loader, user, isAuthenticated, redirectUrl } = useAccess();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // console.log({ loader, user, isAuthenticated, redirectUrl });

  useEffect(() => {
    getEntity() === "college" && dispatch(getCollege());
  }, [dispatch]);

  if (loader) {
    return <Loader />;
  }

  if (!isDesktop) {
    return <DesktopOnly />;
  }

  return (
    <div className="app-content">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            element={
              <PublicRoute
                isAuthenticated={isAuthenticated}
                redirectUrl={redirectUrl}
              />
            }
          >
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms&policies" element={<TermsPolicies />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/password/reset/:id" element={<ResetPassword />} />
            <Route path="/college/me/failed" element={<NotAuth />} />
            {/* public company routes */}
            <Route path="/company" element={<Login />} />
            <Route path="/company/register" element={<RegisterCompany />} />
            {/* public university routes */}
            <Route path="/university" element={<Login />} />
            <Route
              path="/university/register"
              element={<RegisterUniversity />}
            />
          </Route>

          <Route
            element={
              <PrivateRoute
                isAuthenticated={
                  isAuthenticated &&
                  (user?.status === "approved" ||
                    user?.verificationStatus === "approved")
                }
                redirectUrl={redirectUrl}
              />
            }
          >
            <Route path="/college/*" element={<CollegeRoutes user={user} />} />
            <Route path="/company/*" element={<CompanyRoutes user={user} />} />
            <Route
              path="/university/*"
              element={<UniversityRoutes user={user} />}
            />
          </Route>
          <Route
            path="/university/approval"
            element={<AwaitingApproval user={user} />}
          />
          <Route
            path="/company/approval"
            element={<AwaitingApproval user={user} />}
          />
          <Route
            path="/college/approval"
            element={<AwaitingApproval user={user} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
