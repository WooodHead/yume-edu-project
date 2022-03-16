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


export interface ISideNav {
    key: string;
    path: string;
    label: string;
    icon?: JSX.Element;
    subNav?: ISideNav[];
}

export const menuItems = [
  {
    key: "manager",
    path: "",
    label: "Overview",
    icon: DashboardOutlined,
  },
  {
    key: "1",
    path:"students",
    label: "Student",
    icon: SolutionOutlined,
    subNav: [
      {
        key: "students",
        path:"students",
        label: "Student List",
        icon: TeamOutlined,
      },
    ],
  },
  {
    key: "2",
    path:"teachers",
    label: "Teacher",
    icon: DeploymentUnitOutlined,
    subNav: [
      {
        key: "teachers",
        path:"teachers",
        label: "Teacher List",
        icon: TeamOutlined,
      },
    ],
  },
  {
    key: "3",
    path:"courses",
    label: "Course",
    icon: ReadOutlined,
    subNav: [
      {
        key:"courses",
        path:"courses",
        label: "All Courses",
        icon: ProjectOutlined,
      },
      {
        key: "add-course",
        path:"courses/add-course",
        label: "Add Course",
        icon: FileAddOutlined,
      },
      {
        key: "edit-course",
        path:"courses/edit-course",
        label: "Edit Course",
        icon: EditOutlined,
      },
    ],
  },
  {
    key:"message ",
    path:"message",
    label: "Message",
    icon: MessageOutlined,
  },
];
