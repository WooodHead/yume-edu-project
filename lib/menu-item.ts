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
    path: string;
    label: string;
    icon?: JSX.Element;
    subNav?: ISideNav[];
}

export const menuItems = [
  {
    path: [""],
    label: "Overview",
    icon: DashboardOutlined,
  },
  {
    path:["students"],
    label: "Student",
    icon: SolutionOutlined,
    subNav: [
      {
        path:["students"],
        label: "Student List",
        icon: TeamOutlined,
      },
    ],
  },
  {
    path:["teachers"],
    label: "Teacher",
    icon: DeploymentUnitOutlined,
    subNav: [
      {
        path:["teachers"],
        label: "Teacher List",
        icon: TeamOutlined,
      },
    ],
  },
  {
    path:["courses"],
    label: "Course",
    icon: ReadOutlined,
    subNav: [
      {
        path:["courses"],
        label: "All Courses",
        icon: ProjectOutlined,
      },
      {
        path:["courses/add-course"],
        label: "Add Course",
        icon: FileAddOutlined,
      },
      {
        path:["courses/edit-course"],
        label: "Edit Course",
        icon: EditOutlined,
      },
    ],
  },
  {
    path:["message"],
    label: "Message",
    icon: MessageOutlined,
  },
];
