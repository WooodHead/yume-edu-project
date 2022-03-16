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


export interface EditStudentValue {
  name:string;
  email: string;
  country: string;
  id?: number;
}

export interface EditStudentValueProps extends EditStudentValue {
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}