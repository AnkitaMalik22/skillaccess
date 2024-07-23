import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { setSelected, selected } from "../redux/collage/sidebar/sideSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setInTest,
  setTestBasicDetails,
  setTestSelectedTopics,
} from "../redux/collage/test/testSlice";
import { getCollege } from "../redux/collage/auth/authSlice";
import PopUp from "../components/PopUps/PopUp";
import { toast } from "react-hot-toast";

const CollageLayout = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [change, setChange] = useState(false);
  const [path, setPath] = useState("");

  const navigate = useNavigate();

  const selection = useSelector(selected);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const location = useLocation();

  useEffect(() => {
    dispatch(getCollege());
  }, []);

  useEffect(() => {
    // Update sidebar selection based on the current path
    const path = location.pathname;
    arr.forEach((el, i) => {
      if (path.startsWith(el.path)) {
        dispatch(setSelected(i));
      }
    });
  }, [location.pathname, dispatch]);

  const arr = [
    {
      name: "Dashboard",
      path: "/collage/dashboard",
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
            fill={`${hovered === 0 || selection === 0 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Test",
      path: "/collage/test",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.867 10.4831H19.4242C19.2095 8.42659 18.3491 6.49699 16.9691 5.01921C15.5892 3.5423 13.7875 2.6207 11.867 2.39029V10.4831ZM10.9156 12.5207C10.3902 12.5207 9.96423 12.0644 9.96423 11.5019V1.31568C9.96423 0.753175 10.3902 0.296875 10.9156 0.296875C13.6906 0.296875 16.352 1.47769 18.3145 3.57827C20.2771 5.67978 21.3792 8.53009 21.3792 11.5019C21.3792 12.0644 20.9532 12.5207 20.4278 12.5207L10.9156 12.5207ZM9.56347 22.6088C4.90083 21.9581 1.21567 18.0575 0.555597 13.0715C-0.105322 8.08641 2.42048 3.24171 6.73035 1.2275C7.21194 1.00249 7.77267 1.2383 7.98231 1.7531C8.19279 2.26882 7.97221 2.87001 7.49146 3.09499C3.96459 4.74198 1.89848 8.7065 2.43901 12.7853C2.97953 16.865 5.9945 20.0564 9.80931 20.5883C13.6241 21.1211 17.3017 18.863 18.8003 15.0677C19.0049 14.5502 19.5631 14.3072 20.0472 14.5268C20.5305 14.7455 20.757 15.3431 20.5524 15.8615C18.8998 20.0469 15.0774 22.7032 10.9205 22.7033C10.4712 22.7033 10.0182 22.6723 9.56347 22.6088V22.6088Z"
            fill={`${hovered === 1 || selection === 1 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Companies",
      path: "/collage/companies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="21"
          viewBox="0 0 25 21"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.6941 9.49971C18.1775 9.49971 17.7587 9.9474 17.7587 10.4996C17.7587 11.052 18.1775 11.4998 18.6941 11.4998C19.2108 11.4998 19.6295 11.052 19.6295 10.4996C19.6295 9.9474 19.2108 9.49971 18.6941 9.49971ZM18.6941 8.49981H22.436V12.4997H18.6941C17.6512 12.4997 16.8232 11.6149 16.8232 10.4996C16.8232 9.38491 17.6512 8.49981 18.6941 8.49981ZM4.66188 2.57012V18.429C4.56365 18.4208 4.42221 18.42 4.33474 18.4095C3.63734 18.3259 3.35613 18.1797 3.22385 18.0384C3.09167 17.8972 2.95359 17.5967 2.87492 16.8508C2.79615 16.1051 2.79091 16.9961 2.79091 15.4993V5.49933C2.79091 4.00412 2.79662 4.89542 2.87492 4.14984C2.95322 3.40423 3.08989 3.10373 3.22198 2.96234C3.35426 2.82104 3.63528 2.67343 4.33296 2.58914C4.4209 2.57864 4.563 2.57812 4.66188 2.56964V2.57012ZM7.46824 2.49981H17.7587C19.1573 2.49981 20.1947 2.50591 20.8921 2.58953C21.5896 2.67321 21.8708 2.81951 22.0029 2.96062C22.1352 3.10213 22.2733 3.40261 22.3521 4.14821C22.4307 4.89403 22.436 4.00313 22.436 5.49962V6.49971H18.6941C18.6254 6.49892 18.5566 6.50603 18.4895 6.52122C16.5297 6.63832 14.9521 8.3776 14.9521 10.4996C14.9521 12.622 16.5298 14.3614 18.4895 14.4782C18.5566 14.4934 18.6254 14.5007 18.6941 14.4997H22.436V15.4997C22.436 16.995 22.4302 16.1038 22.3521 16.8495C22.2737 17.5951 22.137 17.8954 22.0048 18.0367C21.8726 18.1784 21.5915 18.3258 20.8939 18.41C20.1963 18.494 19.1588 18.4997 17.7587 18.4997H7.46824C7.1106 18.4997 6.84361 18.4939 6.53275 18.4921C6.53275 18.49 6.53275 18.488 6.53275 18.4862V2.513C6.53275 2.5112 6.53275 2.50919 6.53275 2.5072C6.84361 2.50531 7.11051 2.49939 7.46824 2.49939V2.49981ZM7.46824 0.499933C6.06707 0.499933 5.00295 0.497213 4.12285 0.603423C3.24265 0.709533 2.46995 0.939823 1.89911 1.55053C1.32837 2.16131 1.11349 2.98742 1.0148 3.92764C0.916106 4.86773 0.919848 4.00403 0.919848 5.50003V15.4998C0.919848 16.9976 0.917416 16.1354 1.01667 17.0761C1.11602 18.0167 1.33137 18.843 1.90285 19.453C2.47425 20.0631 3.24696 20.2929 4.12641 20.3984C5.00604 20.5039 6.06903 20.5 7.46824 20.5H17.7586C19.1598 20.5 20.2239 20.5026 21.104 20.3964C21.984 20.2903 22.7569 20.06 23.3278 19.4493C23.8986 18.8383 24.1134 18.0124 24.2121 17.0722C24.3108 16.1319 24.3071 16.9956 24.3071 15.4998V13.4999V7.49992V5.50001C24.3071 4.00202 24.3095 4.86451 24.2102 3.92381C24.1109 2.98301 23.8955 2.15681 23.324 1.5467C22.7526 0.936503 21.98 0.707013 21.1005 0.601423C20.2208 0.495803 19.1578 0.499923 17.7586 0.499923H7.46824V0.499933Z"
            fill={`${hovered === 2 || selection === 2 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Students",
      path: "/collage/students",
      icon: (
        <svg
          width="20"
          height="29"
          viewBox="0 0 20 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.4837 15.0139H5.12898C5.12056 15.0139 5.1113 15.0139 5.10288 15.0139C4.58593 15.0057 4.17338 14.5521 4.18012 13.9995C4.1877 13.447 4.61287 13.0059 5.12898 13.0141H14.4837C14.493 13.0131 14.5014 13.0131 14.5107 13.0141C15.0268 13.0213 15.4402 13.4757 15.4326 14.0274C15.4251 14.5756 15.0075 15.014 14.4962 15.0139C14.4921 15.0139 14.4879 15.0139 14.4837 15.0139V15.0139ZM14.4837 19.0134H5.12898C5.12056 19.0134 5.1113 19.0134 5.10288 19.0134C4.58593 19.0062 4.17338 18.5518 4.18012 17.9992C4.1877 17.4475 4.61287 17.0056 5.12898 17.0136H14.4837C14.493 17.0136 14.5014 17.0136 14.5107 17.0136C15.0268 17.0217 15.4402 17.4754 15.4326 18.028C15.4251 18.5747 15.0083 19.0136 14.4977 19.0136C14.4931 19.0136 14.4884 19.0135 14.4837 19.0134V19.0134ZM14.4837 23.0139H5.12898C5.12056 23.0139 5.1113 23.0139 5.10288 23.0139C4.58593 23.0059 4.17338 22.5523 4.18012 21.9996C4.1877 21.447 4.61287 21.0061 5.12898 21.0142H14.4837C14.493 21.0133 14.5014 21.0133 14.5107 21.0142C15.0268 21.0214 15.4402 21.4758 15.4326 22.0275C15.4251 22.5758 15.0075 23.0141 14.4962 23.0141C14.4921 23.0141 14.4879 23.014 14.4837 23.0139V23.0139ZM13.5483 6.01387H17.268C17.2495 5.76363 17.215 5.60164 17.1493 5.46126C17.023 5.19124 16.6197 4.71157 15.6927 3.72066C14.7658 2.72975 14.3187 2.29775 14.0687 2.16457C13.9382 2.09438 13.7841 2.05745 13.5483 2.03676V6.01387ZM3.86439 2.10335C3.16643 2.18794 2.88522 2.33553 2.75388 2.47682C2.6217 2.61812 2.48446 2.91878 2.40616 3.66395C2.32786 4.41004 2.32197 5.51887 2.32197 7.01374V21.0142C2.32197 22.5108 2.32786 23.6196 2.40616 24.3657C2.4853 25.111 2.62338 25.4116 2.75556 25.5529C2.88775 25.6942 3.16895 25.8399 3.86608 25.9236C4.56404 26.0073 5.60131 26.0136 6.99976 26.0136H12.6129C12.6348 26.0136 12.6567 26.0145 12.6786 26.0154C14.0392 26.0154 15.0613 26.0082 15.7458 25.9254C16.4438 25.8417 16.725 25.6942 16.8571 25.5529C16.9893 25.4116 17.1274 25.1127 17.2057 24.3676C17.2848 23.6215 17.2899 22.5126 17.2899 21.0159V8.01362H12.6129C12.096 8.01362 11.6776 7.56635 11.6767 7.01374V2.01331H6.99976C5.59962 2.01331 4.56236 2.01966 3.86439 2.10334V2.10335ZM12.6129 28.0161C12.5911 28.0161 12.5692 28.0153 12.5473 28.0134H6.99976C5.60046 28.0134 4.5371 28.018 3.65812 27.9127C2.7783 27.8065 2.0054 27.5769 1.43457 26.9667C0.862892 26.3565 0.647357 25.5303 0.548008 24.5899C0.44866 23.6494 0.451186 22.5117 0.451186 21.0142V7.01375C0.451186 5.51796 0.447818 4.38124 0.546324 3.44167C0.644831 2.50118 0.859524 1.67495 1.43036 1.06478C2.00119 0.453628 2.77409 0.223228 3.65391 0.117028C4.53457 0.0108278 5.59878 0.0135778 6.99976 0.0135778H12.4631C12.5077 0.00545781 12.5523 0.00094781 12.5978 8.78097e-05C12.6635 -0.00083219 12.7291 0.00545781 12.794 0.0198678C13.6275 0.0207878 14.2674 0.0342678 14.9081 0.377168C15.5985 0.747038 16.0885 1.31498 17.0163 2.3068C17.9449 3.29948 18.4779 3.8278 18.8231 4.56669C19.143 5.25065 19.1548 5.93559 19.1556 6.82029C19.1784 6.93998 19.1801 7.06236 19.1615 7.18205V21.016C19.1615 22.5136 19.1632 23.6494 19.0647 24.5899C18.9654 25.5304 18.7498 26.3565 18.1781 26.9668C17.6065 27.5769 16.8344 27.8065 15.9546 27.9127C15.1038 28.0145 14.0824 28.0161 12.7506 28.0161C12.7052 28.0161 12.6592 28.0161 12.613 28.0161L12.6129 28.0161Z"
            fill={`${hovered === 3 || selection === 3 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Results",
      path: "/collage/results",
      icon: (
        <svg
          width="25"
          height="21"
          viewBox="0 0 25 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.887 16.5427L17.8066 10.5136C17.9337 10.114 18.2907 9.844 18.694 9.844H22.4356V3.00037C22.4356 2.44776 22.0171 2.00049 21.5002 2.00049H11.2589L15.887 16.5427ZM2.7907 3.00037V18.0007C2.7907 18.5524 3.20914 19.0006 3.72609 19.0006H14.6971L10.2747 5.10456L8.35505 11.1337C8.22792 11.5342 7.87094 11.8033 7.46765 11.8033H3.72609C3.20914 11.8033 2.7907 11.365 2.7907 10.8241C2.7907 10.2823 3.20914 9.844 3.72609 9.844H6.79411L9.29045 2.00049H3.72609C3.20914 2.00049 2.7907 2.44776 2.7907 3.00037ZM21.5002 19.0006C22.0171 19.0006 22.4356 18.5524 22.4356 18.0007V11.8033H19.3684L17.077 19.0006H21.5002ZM3.72609 21.0004C2.17609 21.0004 0.919922 19.6567 0.919922 18.0007V3.00037C0.919922 1.34351 2.17609 -0.000244141 3.72609 -0.000244141H21.5002C23.0502 -0.000244141 24.3064 1.34351 24.3064 3.00037V18.0007C24.3064 19.6567 23.0502 21.0004 21.5002 21.0004H3.72609Z"
            fill={`${hovered === 4 || selection === 4 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Question Bank",
      path: "/collage/quesBank",
      icon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20 4.5H4C3.44771 4.5 3 4.94772 3 5.5V19.5C3 20.0523 3.44772 20.5 4 20.5H20C20.5523 20.5 21 20.0523 21 19.5V5.5C21 4.94771 20.5523 4.5 20 4.5ZM4 2.5C2.34315 2.5 1 3.84315 1 5.5V19.5C1 21.1569 2.34315 22.5 4 22.5H20C21.6569 22.5 23 21.1569 23 19.5V5.5C23 3.84315 21.6569 2.5 20 2.5H4ZM6 7.5H8V9.5H6V7.5ZM11 7.5C10.4477 7.5 10 7.94772 10 8.5C10 9.05228 10.4477 9.5 11 9.5H17C17.5523 9.5 18 9.05228 18 8.5C18 7.94772 17.5523 7.5 17 7.5H11ZM8 11.5H6V13.5H8V11.5ZM10 12.5C10 11.9477 10.4477 11.5 11 11.5H17C17.5523 11.5 18 11.9477 18 12.5C18 13.0523 17.5523 13.5 17 13.5H11C10.4477 13.5 10 13.0523 10 12.5ZM8 15.5H6V17.5H8V15.5ZM10 16.5C10 15.9477 10.4477 15.5 11 15.5H17C17.5523 15.5 18 15.9477 18 16.5C18 17.0523 17.5523 17.5 17 17.5H11C10.4477 17.5 10 17.0523 10 16.5Z"
            fill={`${hovered === 5 || selection === 5 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    { name: "Notifications", path: "" },
    {
      name: "Profile",
      path: "/collage/profile",
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
            fill={`${hovered === 7 || selection === 7 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Inbox",
      path: "/collage/inbox",
      icon: (
        <svg
          width="22"
          height="19"
          viewBox="0 0 22 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.46765 9.49999C7.78085 9.49999 8.07301 9.66735 8.24644 9.94549L9.83939 12.4997H12.5799L14.1737 9.94549C14.3471 9.66735 14.6393 9.49999 14.9516 9.49999H19.1256L16.4637 3.09557C16.313 2.73284 15.9779 2.49974 15.6066 2.49974H6.81262C6.44217 2.49974 6.10624 2.73283 5.95637 3.09557L3.29455 9.49999H7.46765ZM2.7907 15.4994C2.7907 16.052 3.20914 16.4993 3.72609 16.4993H18.694C19.2101 16.4993 19.6294 16.052 19.6294 15.4994V11.4998H15.4526L13.8596 14.0549C13.6853 14.333 13.394 14.4994 13.0808 14.4994H9.33928C9.02608 14.4994 8.73393 14.333 8.56049 14.0549L6.96754 11.4998H2.7907V15.4994ZM3.72609 18.5C2.17609 18.5 0.919922 17.1562 0.919922 15.4994V10.4999C0.919922 10.4911 0.920025 10.4825 0.920231 10.4738C0.920249 10.4732 0.920277 10.4726 0.920296 10.472C0.920736 10.4551 0.92155 10.4383 0.922747 10.4216C0.922766 10.4213 0.922794 10.4211 0.922822 10.4208C0.924066 10.4037 0.925713 10.3868 0.927752 10.3699C0.927845 10.3691 0.927967 10.3684 0.928061 10.3676C0.929005 10.3599 0.930025 10.3522 0.931129 10.3446C0.931372 10.343 0.931643 10.3413 0.931896 10.3397C0.932906 10.333 0.933945 10.3263 0.935077 10.3196C0.935544 10.3169 0.936059 10.3142 0.936545 10.3115C0.937518 10.306 0.938482 10.3005 0.939539 10.2951C0.940278 10.2913 0.941073 10.2875 0.941859 10.2838C0.942729 10.2795 0.943599 10.2752 0.944525 10.271C0.945601 10.2661 0.946752 10.2611 0.947893 10.2562C0.948576 10.2533 0.949249 10.2503 0.949951 10.2474C0.951382 10.2415 0.952898 10.2356 0.954441 10.2297C0.954909 10.2279 0.955386 10.226 0.955863 10.2242C0.957734 10.2172 0.959699 10.2101 0.961729 10.2032C0.961841 10.2028 0.961972 10.2023 0.962084 10.2019C0.972721 10.1653 0.985284 10.1292 0.999896 10.094L4.2464 2.28467C4.69599 1.19928 5.70295 0.5 6.81346 0.5H15.6058C16.7171 0.5 17.7241 1.19928 18.1737 2.28375L21.4063 10.0626C21.4664 10.1946 21.5002 10.343 21.5002 10.4999V15.4994C21.5002 17.1562 20.244 18.5 18.694 18.5L3.72609 18.5Z"
            fill={`${hovered === 8 || selection === 8 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Teams",
      path: "/collage/teams",
      icon: (
        <svg
          width="21"
          height="26"
          viewBox="0 0 21 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5062 5.4955C9.59165 5.4955 8.84758 4.70019 8.84758 3.72255C8.84758 2.74491 9.59165 1.94955 10.5062 1.94955C11.4208 1.94955 12.1648 2.74491 12.1648 3.72255C12.1649 4.70019 11.4208 5.4955 10.5062 5.4955ZM10.5062 0.452637C8.81949 0.452637 7.44727 1.91952 7.44727 3.72255C7.44727 5.52559 8.81949 6.99241 10.5062 6.99241C12.1929 6.99241 13.5651 5.52558 13.5651 3.72255C13.5652 1.91951 12.1929 0.452637 10.5062 0.452637Z"
            fill={`${hovered === 9 || selection === 9 ? "#171717" : "white"}`}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.37565 7.23516C3.72589 7.23516 3.19722 6.67007 3.19722 5.97551C3.19722 5.28094 3.72585 4.71586 4.37565 4.71586C5.02541 4.71586 5.55404 5.28094 5.55404 5.97551C5.55404 6.67007 5.02536 7.23516 4.37565 7.23516ZM4.37565 3.21899C2.95374 3.21899 1.79688 4.45559 1.79688 5.97556C1.79688 7.49553 2.95369 8.73213 4.37565 8.73213C5.79756 8.73213 6.95438 7.49553 6.95438 5.97556C6.95438 4.45559 5.7975 3.21899 4.37565 3.21899Z"
            fill={`${hovered === 9 || selection === 9 ? "#171717" : "white"}`}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.5927 14.0405H15.7977V10.8273H18.9325C19.2965 10.8273 19.5927 11.1439 19.5927 11.5331V14.0405ZM16.9115 15.9238L16.7948 16.4353C16.6384 17.1203 16.385 17.7739 16.0413 18.3781L15.7855 18.8281L17.4811 21.07L16.3812 22.2457L14.2839 20.4332L13.863 20.7067C13.2978 21.0739 12.6863 21.3449 12.0455 21.5121L11.567 21.6368L11.283 24.503H9.72755L9.44361 21.6368L8.96512 21.512C8.32446 21.345 7.71303 21.0741 7.14771 20.7067L6.72681 20.4332L4.62952 22.2457L3.5296 21.07L5.22527 18.8281L4.96937 18.3781C4.62573 17.7739 4.37222 17.1202 4.2159 16.4353L4.0992 15.9238L1.41792 15.6203V15.5374H6.56963C6.90179 17.5383 8.53958 19.063 10.5053 19.063C12.471 19.063 14.1088 17.5383 14.4409 15.5374H19.5926V15.6203H19.5927L16.9115 15.9238ZM1.41791 11.5331C1.41791 11.1439 1.71409 10.8273 2.07812 10.8273H5.21288V14.0405H1.41791V11.5331ZM13.0067 15.5374C12.7002 16.7062 11.6953 17.5661 10.5053 17.5661C9.31542 17.5661 8.31049 16.7062 8.004 15.5374H13.0067ZM6.61326 10.7009C6.61326 10.1067 7.06544 9.62338 7.62123 9.62338H13.3894C13.9452 9.62338 14.3974 10.1068 14.3974 10.7009V14.0405H6.61325L6.61326 10.7009ZM18.9325 9.33044H15.4266C14.9997 8.60778 14.2464 8.12646 13.3894 8.12646H7.62124C6.76428 8.12646 6.01094 8.60778 5.58403 9.33044H2.07813C0.941948 9.33044 0.0175781 10.3186 0.0175781 11.5332V14.0405V14.7889V16.9671L2.98892 17.3035C3.129 17.7825 3.30903 18.2468 3.52744 18.6919L1.6486 21.1761L4.53027 24.2565L6.85423 22.248C7.27064 22.4814 7.70503 22.6739 8.15309 22.8236L8.46769 25.9999H12.5431L12.8576 22.8236C13.3058 22.6739 13.7401 22.4815 14.1565 22.248L16.4804 24.2565L19.3621 21.1761L17.4832 18.6919C17.7016 18.2468 17.8816 17.7825 18.0217 17.3035L20.993 16.9672V14.789V14.0406V11.5332C20.993 10.3185 20.0687 9.33043 18.9325 9.33043V9.33044Z"
            fill={`${hovered === 9 || selection === 9 ? "#171717" : "white"}`}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.6354 7.23521C15.9856 7.23521 15.457 6.67012 15.457 5.97556C15.457 5.28099 15.9856 4.71585 16.6354 4.71585C17.2851 4.71585 17.8138 5.28094 17.8138 5.97551C17.8138 6.67007 17.2851 7.23521 16.6354 7.23521ZM16.6354 3.21899C15.2135 3.21899 14.0566 4.45559 14.0566 5.97556C14.0566 7.49553 15.2135 8.73213 16.6354 8.73213C18.0573 8.73213 19.2141 7.49553 19.2141 5.97556C19.2141 4.45559 18.0572 3.21899 16.6354 3.21899Z"
            fill={`${hovered === 9 || selection === 9 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Accounting",
      path: "/collage/accounting",
      icon: (
        <svg
          width="26"
          height="21"
          viewBox="0 0 26 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.2743 7.00019C11.7563 7.00019 12.5716 7.18469 13.0331 7.39068C13.4948 7.59686 13.657 7.80029 13.9759 8.17388C14.2949 8.54754 14.7713 9.09557 15.5638 9.45325C16.3561 9.81084 17.4073 10.0002 19.017 10.0002H19.629C20.7956 10.0002 21.6575 10.0062 22.2235 10.0743C22.7897 10.1427 22.9831 10.2593 23.0566 10.338C23.1303 10.4169 23.2379 10.6216 23.3015 11.2267C23.3651 11.8318 23.3711 12.7543 23.3711 14.0002V15.0001C23.3711 16.2461 23.3652 17.1683 23.3015 17.7736C23.2379 18.3787 23.1303 18.5833 23.0566 18.6621C22.9831 18.741 22.7897 18.8575 22.2235 18.9258C21.6573 18.994 20.7956 19.0001 19.629 19.0001H10.2743C9.10764 19.0001 8.24587 18.994 7.67972 18.9258C7.11375 18.8575 6.92029 18.741 6.84658 18.6621C6.77295 18.5833 6.66537 18.3787 6.60176 17.7736C6.53815 17.1683 6.53225 16.2461 6.53225 15.0001V11.0001C6.53225 9.75305 6.53787 8.83185 6.60176 8.22668C6.66565 7.62158 6.77464 7.41479 6.84845 7.33618C6.92216 7.25726 7.11375 7.14227 7.67972 7.07434C8.24587 7.00647 9.10876 7.00019 10.2743 7.00019H10.2743ZM6.53224 2.00018C8.01424 2.00018 8.82961 2.18457 9.29127 2.39068C9.75274 2.59673 9.91495 2.80029 10.234 3.17388C10.553 3.54754 11.0295 4.09545 11.8218 4.45324C12.6141 4.81097 13.6653 5.00018 15.275 5.00018H17.7581C19.8836 5.00018 19.0752 5.15167 19.2691 5.29693C19.3661 5.36974 19.4203 5.42224 19.4993 5.81268C19.5782 6.20306 19.6168 6.86859 19.6255 7.79327C19.6253 7.86279 19.6321 7.93219 19.6455 8.00006H19.629H19.017C17.5493 8.00006 16.7464 7.81439 16.2927 7.60944C15.839 7.40485 15.6786 7.20258 15.3572 6.82636C15.036 6.4502 14.5532 5.90345 13.7549 5.54694C12.9686 5.19605 11.9216 5.00776 10.34 5.00214C10.318 5.00055 10.2961 5.00006 10.2743 5.00019C9.10809 5.00019 8.21947 4.99628 7.47137 5.08607C6.72326 5.17585 6.03821 5.37458 5.52547 5.92219C5.01273 6.46955 4.8261 7.20198 4.74163 8.00209C4.65715 8.80251 4.66117 9.75215 4.66117 11.0001V14.969C4.17313 14.9468 3.76086 14.9136 3.51745 14.8537C3.17048 14.7683 3.13082 14.7157 3.06243 14.6076C2.92566 14.3914 2.79021 15.2488 2.79021 13.0003V6.00026C2.79021 4.75331 2.79573 3.83199 2.85962 3.22688C2.92361 2.62166 3.03259 2.41499 3.10631 2.33626C3.18012 2.25746 3.37161 2.14247 3.93758 2.0746C4.50373 2.00661 5.36662 2.00026 6.53214 2.00026L6.53224 2.00018ZM6.53224 0.000184578C5.36607 0.000184578 4.47764 -0.00372542 3.72954 0.0859346C2.98143 0.175965 2.29628 0.374385 1.78363 0.922055C1.2708 1.46947 1.08417 2.20196 0.999793 3.00213C0.915319 3.80248 0.919341 4.75207 0.919341 6.00019V13.0001C0.919341 15.2498 0.788654 14.5812 1.51319 15.7268C1.8755 16.2994 2.47982 16.6504 3.09911 16.8031C3.56358 16.9174 4.09512 16.9531 4.68691 16.9728C4.69851 17.3335 4.70936 17.6886 4.74173 17.9962C4.82573 18.796 5.01152 19.5282 5.5237 20.0764C6.03597 20.6244 6.72102 20.8239 7.46969 20.9143C7.96718 20.9742 8.56702 20.9888 9.22915 20.9941C9.26554 20.9987 9.30221 21.0005 9.33879 21.0001H19.6292C20.7966 21.0001 21.6852 21.0044 22.4338 20.9143C23.1822 20.8238 23.8673 20.6244 24.3796 20.0764C24.8919 19.5282 25.0776 18.796 25.1616 17.9962C25.2457 17.1965 25.242 16.2468 25.242 15.0001V13.0001C25.2424 12.9603 25.2406 12.9204 25.2365 12.8812C25.2313 12.1744 25.2175 11.5354 25.1616 11.0039C25.0776 10.2042 24.8918 9.47203 24.3796 8.92393C23.8673 8.37577 23.1823 8.17625 22.4338 8.08616C22.1445 8.05125 21.8098 8.03977 21.4709 8.02744C21.4894 7.94431 21.4981 7.85874 21.4963 7.77341C21.4875 6.81241 21.4643 6.06107 21.3283 5.38877C21.1922 4.71635 20.8791 4.05991 20.3434 3.65836C19.2723 2.85483 19.8852 3.00003 17.7581 3.00003H15.275C13.8075 3.00003 13.0046 2.81412 12.5509 2.60922C12.0972 2.40451 11.9365 2.20254 11.6154 1.82614C11.2941 1.44986 10.8112 0.903235 10.0129 0.546725C9.22682 0.195835 8.18151 0.00766458 6.59998 0.00186458C6.59933 0.00186458 6.59877 0.00186458 6.59811 0.00186458C6.57622 0.000334578 6.55433 -0.000145422 6.53235 3.45785e-05L6.53224 0.000184578Z"
            fill={`${hovered === 10 || selection === 10 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
    {
      name: "Settings",
      path: "/collage/settings",
      icon: (
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.80592 12.0004C9.80592 13.1046 10.6436 14.0001 11.6767 14.0001C12.7098 14.0001 13.5475 13.1046 13.5475 12.0004C13.5475 10.8952 12.7098 10.0006 11.6767 10.0006C10.6436 10.0006 9.80592 10.8951 9.80592 12.0004ZM7.93429 12.0004C7.93429 9.79091 9.60975 7.99989 11.6767 7.99989C13.7428 7.99989 15.4183 9.79091 15.4183 12.0004C15.4183 14.209 13.7428 16 11.6767 16C9.60975 16 7.93429 14.209 7.93429 12.0004ZM9.19299 18.4614C10.1486 18.8368 10.7918 19.7988 10.8162 20.9094V21.0004C10.8162 21.5521 11.2347 22.0003 11.7516 22.0003C12.2677 22.0003 12.687 21.5521 12.687 21.0004V20.8258C12.6912 19.77 13.2814 18.817 14.1806 18.4048C15.1076 17.9683 16.1903 18.178 16.922 18.943L16.9784 19.0033C17.1543 19.1914 17.3917 19.2966 17.6401 19.2966C17.8885 19.2966 18.1268 19.1914 18.3027 19.0023C18.4787 18.8152 18.5772 18.5604 18.5772 18.2949C18.5772 18.0294 18.4787 17.7748 18.3027 17.5867L18.2396 17.5192C17.5318 16.7465 17.3347 15.5924 17.7406 14.6027C17.7408 14.6023 17.7409 14.6019 17.7412 14.6013C18.1318 13.633 19.0217 13.0048 20.0119 13.0003H20.0961C20.613 13.0003 21.0314 12.5521 21.0314 12.0004C21.0314 11.4478 20.613 10.9995 20.0961 10.9995H19.9336C18.9451 10.996 18.0535 10.3651 17.6645 9.39395C17.6309 9.30936 17.6081 9.22024 17.5972 9.13028C17.2865 8.18436 17.5021 7.12418 18.1714 6.39334L18.2278 6.33218C18.4038 6.14505 18.5023 5.89029 18.5023 5.62478C18.5023 5.35928 18.4038 5.10549 18.2278 4.91653C18.0518 4.72927 17.8136 4.62307 17.5652 4.62307C17.3168 4.62307 17.0794 4.72927 16.9034 4.91738L16.8394 4.98488C16.1154 5.74269 15.0326 5.95241 14.1149 5.51955C13.2065 5.1028 12.6163 4.15053 12.6121 3.09035V3.00038C12.6121 2.44777 12.1936 1.99953 11.6767 1.99953C11.1597 1.99953 10.7413 2.44777 10.7413 3.00038V3.17409C10.7371 4.23073 10.1469 5.18288 9.23844 5.59963C9.1593 5.63564 9.07679 5.65993 8.99176 5.67165C8.10772 6.00283 7.11592 5.77333 6.43143 5.0569L6.37502 4.9966C6.19906 4.80934 5.96079 4.70314 5.71326 4.70314C5.46489 4.70314 5.22662 4.80934 5.05066 4.99745C4.87469 5.18471 4.77619 5.43934 4.77619 5.70485C4.77619 5.97035 4.87469 6.22511 5.05066 6.41322L5.1138 6.48072C5.82271 7.25562 6.01888 8.41297 5.63243 9.34534C5.2805 10.366 4.38132 11.0544 3.34153 11.0797H3.25733C2.74039 11.0797 2.32194 11.5278 2.32194 12.0804C2.32194 12.6322 2.74039 13.0803 3.25733 13.0803H3.41983C4.40826 13.084 5.29987 13.7148 5.68463 14.676C6.09381 15.667 5.89764 16.8243 5.182 17.6074L5.12475 17.6677C4.94962 17.8549 4.85112 18.1096 4.85112 18.3751C4.85112 18.6406 4.94962 18.8953 5.12559 19.0834C5.30155 19.2715 5.53982 19.3768 5.78735 19.3768C6.03572 19.3768 6.27399 19.2715 6.44995 19.0825L6.5131 19.015C6.99236 18.5139 7.62807 18.2526 8.2559 18.2526C8.5777 18.2526 8.8974 18.3212 9.19298 18.4614H9.19299ZM8.94546 21.0004C8.93957 20.6665 8.78128 20.4307 8.4925 20.3146C8.26518 20.2075 7.99912 20.2588 7.82905 20.437L7.77348 20.4973C7.24728 21.0598 6.53247 21.3766 5.78736 21.3766C5.04309 21.3766 4.32828 21.0598 3.80292 20.4973C3.27587 19.9348 2.9795 19.1716 2.9795 18.3751C2.9795 17.5786 3.27587 16.8154 3.80292 16.2529L3.85175 16.2007C4.02519 16.0108 4.07318 15.7273 3.96878 15.4735C3.87364 15.2359 3.65474 15.0811 3.41647 15.0802H3.25734C1.70734 15.0802 0.451172 13.7374 0.451172 12.0805C0.451172 10.4227 1.70734 9.07985 3.25734 9.07985C3.56886 9.07362 3.79029 8.90529 3.89806 8.59657C3.99825 8.35267 3.95026 8.06923 3.78355 7.88734L3.72798 7.82801C3.20093 7.26453 2.90541 6.50135 2.90541 5.70484C2.90541 4.90833 3.20093 4.14515 3.72714 3.58362C4.25419 3.02014 4.96816 2.70337 5.71327 2.70337C6.45754 2.70337 7.17234 3.02014 7.69771 3.58264L7.74738 3.63489C7.92419 3.82117 8.19024 3.87244 8.41757 3.76538C8.47734 3.73657 8.53965 3.71582 8.60363 3.70142C8.76781 3.58265 8.86969 3.38379 8.87053 3.17041V3.00037C8.87053 1.34351 10.1267 -0.000244141 11.6767 -0.000244141C13.2267 -0.000244141 14.4829 1.34351 14.4829 3.00037V3.08582C14.4837 3.3451 14.6285 3.57911 14.8609 3.68531C15.0882 3.79237 15.3543 3.7411 15.5243 3.56287L15.5799 3.50342C16.1061 2.94007 16.8209 2.62329 17.5652 2.62329C18.3103 2.62329 19.0243 2.94006 19.5505 3.50256C20.0775 4.06506 20.3739 4.82922 20.3739 5.62475C20.3739 6.42126 20.0775 7.18444 19.5505 7.74694L19.5016 7.79919C19.3282 7.98901 19.2802 8.27343 19.3804 8.51648C19.4065 8.58032 19.4267 8.64697 19.4402 8.71533C19.5513 8.89087 19.7374 8.9989 19.9369 8.99975H20.0961C21.6461 8.99975 22.9022 10.3425 22.9022 12.0004C22.9022 13.6572 21.6461 15.0001 20.0961 15.0001H20.0152C19.7736 15.001 19.5547 15.1558 19.4587 15.3933C19.3543 15.6472 19.4031 15.9307 19.569 16.1134L19.6254 16.1727C20.1525 16.7352 20.448 17.4984 20.448 18.2949C20.448 19.0914 20.1525 19.8546 19.6263 20.4171C19.0992 20.9796 18.3852 21.2965 17.6401 21.2965C16.8959 21.2965 16.1811 20.9796 15.6548 20.4171L15.606 20.365C15.4284 20.1787 15.1632 20.1273 14.9266 20.239C14.7035 20.3415 14.5586 20.5747 14.5578 20.8303V21.0004C14.5578 22.6572 13.3016 24.0001 11.7516 24.0001C10.2016 24.0001 8.94546 22.6572 8.94546 21.0004V21.0004Z"
            fill={`${hovered === 11 || selection === 11 ? "#171717" : "white"}`}
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const pathToSelectionIndex = {
      "/collage/dashboard": 0,
      "/collage/test": 1,
      "/collage/companies": 2,
      "/collage/students": 3,
      "/collage/results": 4,
      "/collage/quesBank": 5,
      "/collage/profile": 7,
      "/collage/inbox": 8,
      "/collage/teams": 9,
      "/collage/accounting": 10,
      "/collage/settings": 11,
    };

    const matchPath = Object.keys(pathToSelectionIndex).find((path) =>
      location.pathname.startsWith(path)
    );

    if (matchPath !== undefined) {
      const index = pathToSelectionIndex[matchPath];
      dispatch(setSelected(index));
    }
  }, [dispatch, location.pathname]);

  //do not remove
  useEffect(() => {
    if (change === true) {
      if (path.match(/\/collage\/dashboard*/)) {
        dispatch(setSelected(0));
      }

      if (path.match(/\/collage\/test*/)) {
        dispatch(setSelected(1));
      }

      if (path.match(/\/collage\/companies*/)) {
        dispatch(setSelected(2));
      }

      if (path.match(/\/collage\/students*/)) {
        dispatch(setSelected(3));
      }

      if (path.match(/\/collage\/results*/)) {
        dispatch(setSelected(4));
      }

      if (path.match(/\/collage\/quesBank*/)) {
        dispatch(setSelected(5));
      }

      if (path.match(/\/collage\/profile*/)) {
        dispatch(setSelected(7));
      }

      if (path.match(/\/collage\/inbox*/)) {
        dispatch(setSelected(8));
      }

      if (path.match(/\/collage\/teams*/)) {
        dispatch(setSelected(9));
      }

      if (path.match(/\/collage\/accounting*/)) {
        dispatch(setSelected(10));
      }

      if (location.pathname.match(/\/collage\/settings*/)) {
        dispatch(setSelected(11));
      }

      setChange(false);
      navigate(path);
    }

    // toast.success(path);
  });
  return (
    <>
      {visible && (
        <PopUp
          handleSave={() => {
            setChange(true);
          }}
          handleOverlay={() => setVisible(false)}
          message={"Test data will be lost. Are you sure you want to exit ?"}
          saveText={"Continue"}
        />
      )}
      <Navbar open={open} setOpen={setOpen} />
      {/* <div className=" h-full  relative"> */}
      <section className="flex h-screen  justify-start pt-20 bg-[#95ACFA] font-dmSans">
        <aside
          className={`px-2 sm:px-4 block transition-width overflow-x-hidden bg-secondary z-30  scrollbar overflow-y-scroll ${
            open ? "w-1/2" : "lg:w-[260px] w-20"
          }`}
        >
          <ul className="list-none">
            {arr.map((el, i) => (
              <li
                className={`btn-transition ${
                  selection === i ? "active-li" : ""
                } `}
                key={i}
                onMouseOver={() => setHovered(i)}
                onMouseOut={() => setHovered(null)}
                onClick={() => {
                  if (
                    !location.pathname.match(/\/collage\/test\/.*/) ||
                    location.pathname.match(/\/collage\/test\/final.*/) ||
                    location.pathname.match(/\/collage\/test\/invite.*/)
                  ) {
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
                    navigate(el.path);
                  } else {
                    setVisible(true);
                    setPath(el.path);
                  }
                }}
              >
                <button
                  className={`flex gap-4 mb-8 h-fit py-2 justify-start ${
                    el.name === "Notifications"
                      ? "ml-[-20px] hidden"
                      : "btn hover-li"
                  } ${
                    open ? "w-full" : "lg:w-full"
                  } shadow-none text-white rounded-2xl border-none focus:outline-none max-w-xs mx-auto ${
                    selection === i
                      ? "bg-white !text-[#171717]"
                      : " bg-transparent"
                  }`}
                >
                  <div className="">{el.icon}</div>
                  <h3
                    className={`text-lg font-bold font-dmSans ${
                      open ? "" : "lg:block hidden"
                    } w-fit h-fit`}
                  >
                    {el.name}
                  </h3>
                </button>
              </li>
            ))}
            <li className="mb-5 text-center font-dmSans text-lg font-bold ">
              <h2 className="text-[#06152B]">© 2024 skillaccess</h2>
            </li>
          </ul>
        </aside>

        <main className="container p-5 md:p-10 bg-white rounded-3xl h-[90vh] overflow-y-scroll w-full flex-1  font-dmSans mr-5 ">
          <div className="row">{children}</div>
        </main>
      </section>
      {/* </div> */}
    </>
  );
};

export default CollageLayout;
