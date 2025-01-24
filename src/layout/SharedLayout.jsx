import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelected, selected } from "../redux/college/sidebar/sideSlice";
import PopUp from "../components/PopUps/PopUp";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const SharedLayout = ({ navbarComponent: Navbar, sidebarItems, getUser }) => {
  const [visible, setVisible] = useState(false);
  const [path, setPath] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const selection = useSelector(selected);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, getUser]);

  useEffect(() => {
    const currentPath = location.pathname;
    const index = sidebarItems.findIndex((item) =>
      currentPath.startsWith(item.path)
    );
    if (index !== -1) {
      dispatch(setSelected(index));
    }
  }, [location.pathname, dispatch, sidebarItems]);

  const handleNavigation = (path) => {
    if (
      !location.pathname.match(/\/test\/.*/) ||
      location.pathname.match(/\/test\/(final|invite).*/)
    ) {
      setOpen(false);
      navigate(path);
    } else {
      setVisible(true);
      setPath(path);
    }
  };

  return (
    <>
      {visible && (
        <PopUp
          handleSave={() => {
            navigate(path);
            setVisible(false);
          }}
          handleOverlay={() => setVisible(false)}
          message="Test data will be lost. Are you sure you want to exit?"
          saveText="Continue"
        />
      )}
      {/* <Navbar open={open} setOpen={setOpen} /> */}
      <Navbar setOpen={setOpen} open={open} />
      <section className="flex h-screen justify-start pt-20 bg-secondary font-dmSans">
        <Sidebar
          open={open}
          selection={selection}
          handleNavigation={handleNavigation}
          items={sidebarItems}
        />
        <main className="container p-5 md:p-10 bg-white rounded-2xl h-[90vh] overflow-y-scroll w-full flex-1 font-dmSans mr-5">
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default SharedLayout;
