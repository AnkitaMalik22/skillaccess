import getCookie from "./getToken";

const isCompany = ()=>{
    return /^\/company.*/.test(window.location.pathname);
   };

export const isUni = ()=>{
    return /^\/university.*/.test(window.location.pathname);
}


export const getHeaders = (contentType = "application/json") => {
    const headers = {headers:{
      "Content-Type": contentType,
    }};
    if (isCompany()) {
      headers.headers["company-token"] = getCookie("token");
    } else if (isUni()) {
      headers.headers["uni-token"] =getCookie("uni-token")
    }else{
      headers.headers["auth-token"] = localStorage.getItem("auth-token");
    }
  
    return headers;
  };

export default  isCompany;