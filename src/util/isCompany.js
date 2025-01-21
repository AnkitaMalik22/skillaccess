import getCookie from "./getToken";

export const isCompany = ()=>{
    return /^\/company.*/.test(window.location.pathname);
   };

export const isUni = ()=>{
    return /^\/university.*/.test(window.location.pathname);
}


export const getHeaders = (contentType = "application/json",additionalHeaders={}) => {
    const headers = {headers:{
      "Content-Type": contentType,
      ...additionalHeaders
    }};
    const userType = localStorage.getItem("userType");
    
    if (isCompany() && userType === "company") {
      headers.headers["company-token"] = getCookie("token");
    } else if (isUni() && userType === "university") {
      headers.headers["uni-token"] = getCookie("uni-token");
    } else if (userType === "college") {
      headers.headers["auth-token"] = localStorage.getItem("auth-token");
    }
  
    return headers;
  };


  export const getEntity = ()=>{
    if(isCompany()){
      return "company/pr"
    }else if(isUni()){
      return "university/pr"
    }else{
      return "college"
    }
  }
export default  isCompany;