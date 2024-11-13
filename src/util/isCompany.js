const isCompany = ()=>{
    return /\/company.*/.test(window.location.pathname);
   };

export default  isCompany;