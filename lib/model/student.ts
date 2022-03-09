import { CourseShort } from "./course";

export interface IStudent {
  id: number;
  name: string;
  email: string;
  country: string;
  type: { id: number; name: string };
  createdAt: string;
  courses: CourseShort;
  profileId: number;
  updatedAt: string;
}
