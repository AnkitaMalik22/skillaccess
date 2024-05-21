// Layout.js
import React from "react";

const Layout = ({ children }) => {
  return (
    <section className="bg-[#FFF] h-[100vh] md:h-full">
      <div className="flex flex-col md:flex-row gap-10 md:flex-nowrap flex-wrap h-full items-center justify-center">
        <div className="w-full lg:w-1/2">
          <div className="hidden md:block">
            {/* This div will only be visible on screens larger than lg */}
            <img
              className="w-full h-[100vh] object-cover"
              src="/images/loginBg.jpg"
              alt="login-image"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Layout;
