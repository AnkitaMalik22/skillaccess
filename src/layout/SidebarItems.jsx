import React from "react";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuBuilding2,
  LuBriefcase,
  LuUsers,
  LuFileText,
  LuBookOpen,
  LuUser,
} from "react-icons/lu";

const iconProps = { size: 24 };

export const companySidebarItems = [
  {
    name: "Dashboard",
    path: "/company/pr/dashboard",
    icon: (active) => (
      <LuLayoutDashboard {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Test",
    path: "/company/pr/test",
    icon: (active) => (
      <LuClipboardList {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Campus Drive",
    path: "/company/pr/campus-drive",
    icon: (active) => (
      <LuClipboardList {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name : "Jobs",
    path : "/company/pr/jobs",
    icon : (active) => (
      <LuBriefcase {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Results",
    path: "/company/pr/results",
    icon: (active) => (
      <LuFileText {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Question Bank",
    path: "/company/pr/quesBank",
    icon: (active) => (
      <LuBookOpen {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },

  {
    name: "Profile",
    path: "/company/pr/profile",
    icon: (active) => (
      <LuUser {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
];

export const collegeSidebarItems = [
  {
    name: "Dashboard",
    path: "/college/dashboard",
    icon: (active) => (
      <LuLayoutDashboard {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Test",
    path: "/college/test",
    icon: (active) => (
      <LuClipboardList {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Companies",
    path: "/college/companies",
    icon: (active) => (
      <LuBuilding2 {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Jobs",
    path: "/college/jobs",
    icon: (active) => (
      <LuBriefcase {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name : "Campus Drive",
    path : "/college/campus-drive",
    icon : (active) => (
      <LuClipboardList {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Students",
    path: "/college/students",
    icon: (active) => (
      <LuUsers {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Results",
    path: "/college/results",
    icon: (active) => (
      <LuFileText {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Question Bank",
    path: "/college/quesBank",
    icon: (active) => (
      <LuBookOpen {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Profile",
    path: "/college/profile",
    icon: (active) => (
      <LuUser {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },

];

export const universitySidebarItems = [
  {
    name: "Dashboard",
    path: "/university/pr/dashboard",
    icon: (active) => (
      <LuLayoutDashboard {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Test",
    path: "/university/pr/test",
    icon: (active) => (
      <LuClipboardList {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Results",
    path: "/university/pr/results",
    icon: (active) => (
      <LuFileText {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Students",
    path: "/university/pr/students",
    icon: (active) => (
      <LuUsers {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Question Bank",
    path: "/university/pr/quesBank",
    icon: (active) => (
      <LuBookOpen {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
  {
    name: "Profile",
    path: "/university/pr/profile",
    icon: (active) => (
      <LuUser {...iconProps} color={active ? "#171717" : "white"} />
    ),
  },
];
