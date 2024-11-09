import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FaCoins } from "react-icons/fa";
import useTranslate from "../../hooks/useTranslate";
import GoogleTranslate from "../GoogleTranslate";

const Navbar = (props) => {
  const currentLanguage = useTranslate();
  const navigate = useNavigate();
  const goToProfile = () => {
    // Function to navigate to profile page
    navigate("/collage/profile"); // Use navigate function to navigate to desired URL
  };
  const userDetails = useSelector((state) => state.collageAuth);

  return (
    <nav className="navbar flex justify-between bg-white w-full z-[9999] fixed top-0 border-b-black border">
      {/* left */}
      <div>
        {/* mobile only */}
        <button
          className="btn btn-primary sm:hidden  "
          onClick={() => props.setOpen(!props.open)}
        >
          hamb
        </button>

        <div className="ml-3">
          {" "}
          <img src="../../../images/logo.png" alt="" />
        </div>
      </div>

      {/* right */}
      <div className="flex gap-4">
        <button className="border-2 border-[#D9E1E7]  text-[#D9E1E7] rounded-lg px-2 p-1 relative">
          <FiBell className="text-lg" />{" "}
          <div className="rounded-full h-2 w-2 bg-lightBlue absolute top-1 right-2"></div>
        </button>

        <button
          onClick={() => {
            navigate("/collage/accounting");
          }}
          className="border border-[#D9E1E7] text-blued  rounded-lg px-3 p-1 relative flex items-center"
        >
          <FaCoins />
          <h1 className="text-blued  px-2">
            {userDetails?.balance?.credit ? userDetails?.balance?.credit : 0}
          </h1>
        </button>

        <div
          className="border border-[#D9E1E7]  rounded-lg p-2 relative flex gap-3"
          style={{ marginRight: "12rem" }}
          onClick={goToProfile}
        >
          <img
            src={userDetails?.user?.avatar?.url}
            alt="icon"
            className="h-5 w-5"
          />{" "}
          <h2 className="text-sm font-bold self-center">
            Hello {userDetails?.user?.FirstName}
          </h2>
        </div>

        <GoogleTranslate currentLanguage={currentLanguage} />
      </div>
    </nav>
  );
};

export default Navbar;
