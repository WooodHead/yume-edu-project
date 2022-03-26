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
  teacherId: number;
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
  id: number;
  cover: string;
  name: string;
  duration: number;
  teacherName: string;
  maxStudents: number;
  startTime: string;
  star: number;
  children?: ReactNode;
}

export interface ICourseSales {
  price: number;
  batches: number;
  studentAmount: number;
  earnings: number;
}
export interface IType {
  id?: number;
  name?: string;
}

export interface ISchedule {
  classTime: string[];
  chapters: { [key:string]:string | number}[];
  
}

export interface IScheduleReq extends ISchedule {
  scheduleId: number | null;
  courseId?: number | null;
}

export interface IChapters {
  name: string;
  content: string;
  createdAt: string;
  id: number;
  order: number;
  updatedAt: string;
}

export interface ICourse {
  cover: string;
  detail: string;
  duration: number;
  durationUnit: number;
  maxStudents: number;
  name: string;
  price: number;
  startTime: string;
  teacherId: number;
  uid: string;
  type: IType;
  [key: string]: string | number | object;
}

export interface CourseType {
  name: string;
  amount: number;
}