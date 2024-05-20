// Layout.js
import React from "react";

const Layout = ({ children }) => {
  return (
    <section className="bg-[#FFF] ">
      <div className="flex flex-col lg:flex-row gap-10 lg:flex-nowrap flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="hidden lg:block">
            {/* This div will only be visible on screens larger than lg */}
            <img
              className="w-full h-full object-cover"
              src="/images/loginBg.jpg"
              alt="login-image"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
