import { CgAwards, CgClipboard, CgTrending } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlinedFlag } from "react-icons/md";
import { TbBriefcase2 } from "react-icons/tb";

export const DASHBOARD_CARDS = [
  {
    id: "students",
    icon: CgClipboard,
    iconColor: "#5243AA",
    bgColor: "#f6f6fb",
    title: "Students",
  },
  {
    id: "companies",
    icon: CgAwards,
    iconColor: "green",
    bgColor: "#f2f9f7",
    title: "Companies",
  },
  {
    id: "placedStudents",
    icon: CgTrending,
    iconColor: "#FF991F",
    bgColor: "#fffaf4",
    title: "Students Placed",
  },
  {
    id: "jobs",
    icon: TbBriefcase2,
    iconColor: "#1E90FF",
    bgColor: "#fafbff",
    title: "Total Jobs",
  },
  {
    id: "assessments",
    icon: MdOutlinedFlag,
    iconColor: "#1E90FF",
    bgColor: "#fafbff",
    title: "Available Assessment",
    actionLabel: "Create New",
    actionIcon: FaArrowRight,
  },
];

export const COMPANY_DASHBOARD_CARDS = [
  {
    id: "jobs",
    icon: CgClipboard,
    iconColor: "#5243AA",
    bgColor: "#f6f6fb",
    title: "Total Jobs",
  },
  {
    id: "studentsHired",
    icon: CgAwards,
    iconColor: "green",
    bgColor: "#f2f9f7",
    title: "Students Hired",
  },
  {
    id: "studentsAppeared",
    icon: CgTrending,
    iconColor: "#FF991F",
    bgColor: "#fffaf4",
    title: "Students Appeared",
  },
  {
    id: "institutes",
    icon: TbBriefcase2,
    iconColor: "#1E90FF",
    bgColor: "#fafbff",
    title: "Institutes",
  },
  {
    id: "assessments",
    icon: MdOutlinedFlag,
    iconColor: "#1E90FF",
    bgColor: "#fafbff",
    title: "Available Assessment",
    actionLabel: "Create New",
    actionIcon: FaArrowRight,
  },
];
