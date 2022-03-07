import {
  CalendarOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  FileAddOutlined,
  MessageOutlined,
  ProfileOutlined,
  ProjectOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React from "react";

/**
 * router path
 */
export enum RoutePath {
  manager = "manager",
  teachers = "teachers",
  students = "students",
  courses = "courses",
  addCourse = "add-course",
  editCourse = "edit-course",
  message = "message",
  own = 'own',
  schedule = 'schedule',
  profile = 'profile',
}

export interface SideNav {
  icon?: JSX.Element;
  label: string;
  path: string[];
  hideLinkInBreadcrumb?: boolean; // 当前面包屑上的链接是否应该被隐藏
  subNav?: SideNav[];
  hide?: boolean;
}

const students: SideNav = {
  path: [RoutePath.students],
  label: "Student",
  icon: <SolutionOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [{ path: [""], label: "Student List", icon: <TeamOutlined /> }],
};

const courses: SideNav = {
  path: [RoutePath.courses],
  label: "Course",
  icon: <ReadOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    { path: [""], label: "All Courses", icon: <ProjectOutlined /> },
    {
      path: [RoutePath.addCourse],
      label: "Add Course",
      icon: <FileAddOutlined />,
    },
    {
      path: [RoutePath.editCourse],
      label: "Edit Course",
      icon: <EditOutlined />,
    },
  ],
};

const teachers: SideNav = {
  path: [RoutePath.teachers],
  label: "Teacher",
  icon: <DeploymentUnitOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    {
      path: [""],
      label: "Teacher List",
      icon: <TeamOutlined />,
    },
  ],
};

const overview: SideNav = {
  path: [],
  label: "Overview",
  icon: <DashboardOutlined />,
};

const messages: SideNav = {
  path: [RoutePath.message],
  label: "Message",
  icon: <MessageOutlined />,
};

const studentCourses: SideNav = {
  path: [RoutePath.courses],
  label: "Course",
  icon: <ReadOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    { path: [""], label: "All Courses", icon: <ProjectOutlined /> },
    { path: [RoutePath.own], label: "My Courses", icon: <FileAddOutlined /> },
  ],
};

const classSchedule: SideNav = {
  path: [RoutePath.schedule],
  label: "Class Schedule",
  icon: <CalendarOutlined />,
};

const profile: SideNav = {
  path: [RoutePath.profile],
  label: "Profile",
  hide: true,
  icon: <ProfileOutlined />,
};

export const routes = new Map([
  ["manager", [overview, students, teachers, courses, messages]],
//   ["teacher", [overview, classSchedule, students, courses, profile, messages]],
//   ["student", [overview, studentCourses, classSchedule, profile, messages]],
]);
