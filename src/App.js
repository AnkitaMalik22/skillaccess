import "./App.css";
import React, { Suspense, lazy, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCollege } from "./redux/college/auth/authSlice";
import TestRoute from "./pages/college/test/TestHome";
import JobRoute from "./pages/college/jobs";
import ResultsRoute from "./pages/college/results";
import QuesRoute from "./pages/college/quesBank";
import StudentRoute from "./pages/college/students";
import InboxRoute from "./pages/college/inbox";
import SettingsRoute from "./pages/college/settings";
import TeamsRoute from "./pages/college/teams";
import Profile from "./pages/college/profile/Profile";
import CompaniesRoute from "./pages/college/companies";
import Loader from "./Loader";
import ForgotPassword from "./pages/college/auth/ForgotPassword";
import ResetPassword from "./pages/college/auth/ResetPassword";
import NotAuth from "./components/PopUps/NotAuth";
import AccountRoute from "./pages/college/accounting/AccountRoutes";
import CollegeLayout from "./layout/College";
import SecurityAppPage from "./pages/college/settings/SecurityAppPage";
// company imports
import LoginCompany from "./pages/company/auth/Login";
import RegisterCompany from "./pages/company/auth/RegisterCompany";
import getCookie from "./util/getToken";
import CompanyProfile from "./pages/company/profile/Profile";
import AwaitingApproval from "./pages/company/AwatingApproval";
import DashboardCompany from "./pages/company/dashboard/Dashboard";
import CompanyLayout from "./layout/Company";
import Job from "./pages/company/jobs/Job";
import CreateJob from "./pages/company/jobs/CreateJob";
import CompanyTestHome from "./pages/company/test/TestHome";
import CompanyResultRoutes from "./pages/company/results";
import JobDetailsPage from "./pages/company/jobs/JobDetails";
import InvitedStudentsForJob from "./pages/company/jobs/InvitedStudentsForJob";
import Jobs from "./pages/college/jobs/Jobs";
import DesktopOnly from "./pages/common/DesktopOnly";
import AddTestToJob from "./pages/company/jobs/AddTestToJob";
import EditJob from "./pages/company/jobs/EditJob";
import Settings from "./pages/company/settings/Settings";
import ViewInvitedStudents from "./pages/college/companies/ViewInvitedStudents";
import RegisterUniversity from "./pages/university/auth/RegisterUniversity";
import UniversityLoginPage from "./pages/university/auth/LoginUniversity";

const Register = lazy(() => import("./pages/college/auth/Register"));
const Login = lazy(() => import("./pages/college/auth/Login"));
const TermsPolicies = lazy(() => import("./pages/college/auth/TermsPolicies"));
const Dashboard = lazy(() => import("./pages/college/dashboard/Dashboard"));



export default function App() {
  const [loader, setLoader] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user, isLoggedIn, logoutError, USER_LOADING } = useSelector(
    (state) => state.collegeAuth
  );
  const { data: company, isCompanyLogin } = useSelector(
    (state) => state.companyAuth
  );
  const location = useLocation();
  const [paths, setPaths] = useState([
    /^\/$/, // Exact match for "/"
    /^\/register$/, // Exact match for "/register"
    /^\/terms&policies$/, // Exact match for "/terms&policies"
    /^\/forgotPassword$/, // Exact match for "/forgotPassword"
    /^\/password\/reset\/.*$/, // Match for "/password/reset/*"
    /^\/college\/me\/failed$/, // Exact match for "/college/me/failed"
    /^\/college\/settings\/security\/securityApp$/, // Exact match for "/college/settings/security/securityApp"
    /^\/company.*$/,
    /^\/university.*$/,

  ]);

  useEffect(() => {
    let shouldGetCollege = true;
    for (let i = 0; i < paths.length; i++) {
      const match = location.pathname.match(paths[i]);
      //console.log(
      //   `Trying to match path: ${paths[i]} with pathname: ${location.pathname}`
      // );
      //console.log(`Match result: ${match}`);
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
    //console.log(logoutError);
    if (logoutError) {
      navigate("/");
    }
  }, [logoutError]);
  useEffect(() => {
    if (/^\/company\/pr\/.*$/.test(window.location.pathname) && !getCookie("token")) {
      console.log(!getCookie);
      navigate("/company");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/" && !company) {
      navigate("/college/dashboard");
    }
  }, [isLoggedIn, navigate]);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loader || USER_LOADING) {
    return <Loader />;
  }
  return isDesktop ? (
    <div className="app-content">
      <React.Fragment>
      
      {isLoggedIn ? (
        <CollegeLayout>
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
                {JobRoute()}
              </>
              <Route path="/college/dashboard" element={<Dashboard />} />
              <Route path="/college/profile" element={<Profile />} />
              <Route path="/college/Jobs" element={<Jobs />} />

            </Routes>
          </Suspense>
        </CollegeLayout>
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/college/settings/security/securityApp"
              element={<SecurityAppPage />}
            />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms&policies" element={<TermsPolicies />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/password/reset/:id" element={<ResetPassword />} />
            <Route path="college/me/failed" element={<NotAuth />} />



            {/* company routes */}

            <Route path="/company/">
              <Route path="" element={<LoginCompany />} />
              <Route path="register" element={<RegisterCompany />} />
          
              <Route path="approval" element={<AwaitingApproval />} />
              <Route path="pr"  element={<CompanyLayout />}>
            {/* <Route path="/" element={<CompanyLayout />}> */}
            {CompanyTestHome()}
            <Route path="settings" element={<Settings />} />
            {CompanyResultRoutes()}
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="dashboard" element={<DashboardCompany />} />
            <Route path="jobs" element={<Job />} />
            <Route path="jobs/create" element={<CreateJob />} />
            <Route path="jobs/:id" element={<JobDetailsPage />} />
            <Route path="job/students" element={<InvitedStudentsForJob />} />
            <Route path="job/add-test/:jobId" element={<AddTestToJob />} />
            <Route path="job/edit/:jobId" element={<EditJob />} />

            
           
             </Route>
            </Route>

            {/* university routes */}
            <Route path="/university/">
              <Route path="" element={<UniversityLoginPage />} />
              <Route path="register" element={<RegisterUniversity />} />
              <Route path="approval" element={<AwaitingApproval />} />
              <Route path="pr" element={<CompanyLayout />}>
                <Route path="settings" element={<Settings />} />
                
              </Route>
            </Route>
              
            {/* </Route> */}
           
            {/* {isCompanyLogin && (
          <Route path="/company" element={<CompanyLayout />}>
            <Route path="dashboard" element={<DashboardCompany />} />
          </Route>
        )} */}
          </Routes>
        </Suspense>
      )}
      
    </React.Fragment>
    </div>
  ) : (
    <DesktopOnly />
  );
   
  
}
