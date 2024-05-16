import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/StudentNavbar";
import {
  setSelected,
  selected,
  selectedStudent,
} from "../redux/student/sidebar/sideSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setTestBasicDetails,
  setTestSelectedTopics,
} from "../redux/collage/test/testSlice";
import TestHeader from "../components/student/test/start/TestHeader";

const StudentTestLayout = ({ children }) => {
  const navigate = useNavigate();

  const selection = useSelector(selectedStudent);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [down, setDown] = useState(0);

  const location = useLocation();
  const bottom = useRef(null);

  const arr = [
    {
      name: "UX Test - Basics",
      path: "/student/test/section/1",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.64642 7.4993H7.5779V2.4998H2.64642V7.4993ZM1.66012 9.5C1.11504 9.5 0.673828 9.0518 0.673828 8.50009V1.49989C0.673828 0.94729 1.11504 0.5 1.66012 0.5H8.56508C9.10928 0.5 9.55138 0.9473 9.55138 1.49989V8.50009C9.55138 9.0518 9.10928 9.5 8.56508 9.5H1.66012ZM13.4966 7.4993H18.4289V2.4998H13.4966V7.4993ZM12.5103 9.5C11.9652 9.5 11.524 9.0518 11.524 8.50009V1.49989C11.524 0.94729 11.9652 0.5 12.5103 0.5H19.4152C19.9594 0.5 20.4015 0.9473 20.4015 1.49989V8.50009C20.4015 9.0518 19.9594 9.5 19.4152 9.5H12.5103ZM2.64642 18.5H7.5779V13.4996H2.64642V18.5ZM1.66012 20.4998C1.11504 20.4998 0.673828 20.0516 0.673828 19.4999V12.4997C0.673828 11.9471 1.11504 11.4998 1.66012 11.4998H8.56508C9.10928 11.4998 9.55138 11.9471 9.55138 12.4997V19.4999C9.55138 20.0516 9.10928 20.4998 8.56508 20.4998H1.66012ZM13.4966 18.5H18.4289V13.4996H13.4966V18.5ZM12.5103 20.4998C11.9652 20.4998 11.524 20.0516 11.524 19.4999V12.4997C11.524 11.9471 11.9652 11.4998 12.5103 11.4998H19.4152C19.9594 11.4998 20.4015 11.9471 20.4015 12.4997V19.4999C20.4015 20.0516 19.9594 20.4998 19.4152 20.4998H12.5103Z"
            fill={`${selection === 0 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },

    {
      name: "UX Test - Basics",
      path: "/student/test/section/2",
      icon: (
        <svg
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.06351 5.50037C6.06351 7.15729 7.32052 8.50006 8.87053 8.50006C10.4205 8.50006 11.6767 7.15729 11.6767 5.50037C11.6767 3.84351 10.4205 2.50068 8.87053 2.50068C7.32052 2.50068 6.06351 3.84351 6.06351 5.50037ZM4.19273 5.50037C4.19273 2.7392 6.28663 0.5 8.87053 0.5C11.4536 0.5 13.5475 2.7392 13.5475 5.50037C13.5475 8.2616 11.4536 10.4999 8.87053 10.4999C6.28663 10.4999 4.19273 8.2616 4.19273 5.50037ZM15.4183 19.4999V17.5001C15.4183 15.8432 14.1621 14.5004 12.6121 14.5004H5.12812C3.57812 14.5004 2.32195 15.8432 2.32195 17.5001V19.4999C2.32195 20.0525 1.90267 20.4998 1.38656 20.4998C0.869614 20.4998 0.451172 20.0525 0.451172 19.4999V17.5001C0.451172 14.7389 2.54507 12.4997 5.12812 12.4997H12.6121C15.1951 12.4997 17.2899 14.7389 17.2899 17.5001V19.4999C17.2899 20.0525 16.8706 20.4998 16.3545 20.4998C15.8375 20.4998 15.4183 20.0525 15.4183 19.4999Z"
            fill={`${selection === 7 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },

    
  ];

  useEffect(() => {
    // bottom.current.scrollIntoView();
    if (location.pathname.match(/\/student\/dashboard*/)) {
      dispatch(setSelected(0));
      setDown(0);
    }

    if (location.pathname.match(/\/student\/test*/)) {
      dispatch(setSelected(1));
      setDown(1);
    }

    if (location.pathname.match(/\/collage\/companies*/)) {
      dispatch(setSelected(2));
      setDown(2);
    }

    if (location.pathname.match(/\/collage\/StudentTests*/)) {
      dispatch(setSelected(3));
      setDown(3);
    }

    if (location.pathname.match(/\/collage\/results*/)) {
      dispatch(setSelected(4));
      setDown(4);
    }

    if (location.pathname.match(/\/collage\/quesBank*/)) {
      dispatch(setSelected(5));
      setDown(5);
    }

    if (location.pathname.match(/\/collage\/profile*/)) {
      bottom.current.scrollIntoView();
      dispatch(setSelected(7));
      setDown(7);
    }

    if (location.pathname.match(/\/collage\/inbox*/)) {
      bottom.current.scrollIntoView();
      dispatch(setSelected(8));
      setDown(8);
    }

    if (location.pathname.match(/\/collage\/teams*/)) {
      bottom.current.scrollIntoView();
      dispatch(setSelected(9));
      setDown(9);
    }

    if (location.pathname.match(/\/collage\/accounting*/)) {
      bottom.current.scrollIntoView();
      dispatch(setSelected(10));
      setDown(10);
    }

    if (location.pathname.match(/\/collage\/settings*/)) {
      bottom.current.scrollIntoView();
      dispatch(setSelected(11));
      setDown(11);
    }
  }, []);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <TestHeader />
      <div className=" h-full bg-blued relative">
        <div className="flex  justify-start ">
          <aside
            className={` px-4 h-[90vh] transition-width max-w-[15rem] overflow-x-hidden bg-secondary fixed left-0 z-30  scrollbar overflow-y-scroll ${
              open ? "w-1/2" : "w-14 lg:w-full "
            }`}
            style={{ marginTop: "1rem" }}
          >
            {" "}
            <ul className="list-none">
              {arr.map((el, i) => {
                return (
                  <>
                    {selection === i && <div className="" ref={bottom}></div>}
                    {el.name === "Notifications" && (
                      <div
                        className={`${
                          open ? "w-full " : "w-1 sm:w-full"
                        } -ml-2 mb-9 text-white text-base font-bold`}
                      >
                        NOTIFICATIONS
                      </div>
                    )}
                    <li
                      onMouseOver={() => dispatch(setSelected(i))}
                      onMouseOut={() => dispatch(setSelected(down))}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        dispatch(setSelected(i));
                        dispatch(
                          setTestBasicDetails({
                            name: "",
                            description: "",
                            totalAttempts: null,
                            totalQuestions: 0,
                          })
                        );
                        dispatch(setTestSelectedTopics([]));
                        setOpen(false);
                        setDown(i);
                        // window.scrollTo({
                        //   top:
                        //     window.scrollY +
                        //     bottom.current.getBoundingClientRect().top,
                        //   behavior: "smooth",
                        // });
                        return navigate(el.path);
                      }}
                    >
                      <button
                        className={` ml-[-10px] sm:ml-[5px] flex gap-4 mb-10  h-fit  py-2 justify-start ${
                          el.name === "Notifications"
                            ? "ml-[-20px] hidden"
                            : "btn "
                        }
                     ${
                       open ? "w-full " : " "
                     }   shadow-none text-white rounded-xl  border-none  mt-2 focus:outline-none  max-w-xs hover:bg-white hover:text-black mx-auto 
                     ${
                       selection === i
                         ? "bg-white !text-black w-[15rem]"
                         : "bg-blued"
                     }
                     hover:w-[15rem]  `}
                      >
                        <div className="w-3 ml-[-10px] ">{el.icon}</div>

                        <h3
                          className={`text-base font-dmSans ${
                            open ? "" : "lg:block hidden"
                          } w-fit h-fit`}
                        >
                          {el.name}
                        </h3>
                      </button>
                    </li>
                  </>
                );
              })}

              <li className="mb-5 pl-8 font-dmSans text-sm font-bold">
                <h2>© 2022 skillassess</h2>
              </li>
            </ul>
          </aside>
          {/* rounded-3xl */}
          <div
            className="bg-white  h-full min-h-[95vh] w-full p-4 mx-4 ml-14 lg:ml-60 mt-6"
            style={{
              borderTopLeftRadius: "0rem !important",
              borderBottomLeftRadius: "0rem",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentTestLayout;
