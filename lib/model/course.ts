import { ReactNode } from "react";

export interface CourseShort {
  id: number;
  name: string;
  courseId: number;
}

export interface ICourseDetails {
    children?: ReactNode;
    cover: string;
    name: string;
    id: number;
    duration: number;
    teacherName: string;
    maxStudents: number;
    startTime: string;
    star: number;
    createdAt: string;
    uid: string;
    detail: string;
    sales: ICourseSales;
    schedule: ISchedule;
    type: IType;
  }

  export interface CourseCardProps {
    id: number,
    cover:string,
    name: string,
    duration: number,
    teacherName: string,
    maxStudents: number,
    startTime: string,
    star: number,
    children?: ReactNode,
  }

export interface ICourseSales {
  price: number;
  batches: number;
  studentAmount: number;
  earnings: number;
}
export interface IType {
  map: any;
  id: number;
  name: string;
}

export interface ISchedule {
  classTime: [string];
  chapters: IChapters;
}

export interface IChapters {
  map: any;
  content: string;
  createdAt: string;
  id: number;
  name: string;
  order: number;
  updatedAt: string;
}