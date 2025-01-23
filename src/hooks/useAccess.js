import axios from "axios";
import { useState, useEffect } from "react";
import {
  LOGIN_PATH,
  COLLEGE_PATH,
  UNIVERSITY_PATH,
  COMPANY_PATH,
  UNIVERSTITY_APPROVAL,
  COMPANY_APPROVAL,
  COLLEGE_APPROVAL,
} from "../constants/routes";
import getCookie from "../util/getToken";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function useAccess() {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(LOGIN_PATH);

  async function getAccess() {
    const token = getCookie("token") || localStorage.getItem("auth-token");
    try {
      setLoader(true);
      const { data } = await axios.get(`${REACT_APP_API_URL}/api/auth/access`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const user = data?.payload?.user;
      if (user) {
        const role = user.role;
        let redirectPath = COLLEGE_PATH;
        switch (role) {
          case "college":
            if (user.status !== "approved") redirectPath = COLLEGE_APPROVAL;
            else redirectPath = COLLEGE_PATH;
            break;
          case "company":
            if (user.status !== "approved") redirectPath = COMPANY_APPROVAL;
            else redirectPath = COMPANY_PATH;
            break;
          case "university":
            if (user.verificationStatus !== "approved")
              redirectPath = UNIVERSTITY_APPROVAL;
            else redirectPath = UNIVERSITY_PATH;
            break;
          default:
            redirectPath = LOGIN_PATH;
            break;
        }

        setRedirectUrl(redirectPath);
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setRedirectUrl(LOGIN_PATH);
        setIsAuthenticated(false);
        setUser(null);
      }

    } catch (error) {
      console.log("error");
      setRedirectUrl(LOGIN_PATH);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getAccess();
  }, []);

  return { loader, user, isAuthenticated, redirectUrl };
}