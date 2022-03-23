import { message } from "antd";
import { ICourse, ICourseDetails, IScheduleReq } from "../../lib/model/course";
import { EditStudentValue } from "../../lib/model/student";
import { httpDelete, httpGet, httpPost, httpPut } from "./http";

// Login
const path = "login";
export function postLogin(req: {
  password: string;
  email: string;
  role: string;
}) {
  return httpPost(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("login failed"));
}

// Logout
export function postLogout() {
  const path = "logout";
  return httpPost(path)
    .then((res) => res.data)
    .catch((err) => message.error("logout failed"));
}

// Add a student
export function postStudents(req: EditStudentValue) {
  const path = "students";
  return httpPost(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Add students failed"));
}

// Edit a student
export function putStudents(req: {
  name: string;
  email: string;
  country: string;
  id: number;
}) {
  const path = "students";
  return httpPut(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Edit students failed"));
}

// Show student lists
export function getStudents(req: { page: number; limit: number }) {
  let path = "students";

  return httpGet(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Get students failed"));
}

//
export function getStudentById(id: number | string) {
  const path = `students/${id}`;
  return httpGet(path, {})
    .then((res) => res)
    .catch((err) => message.error("Get students Id failed"));
}

// Delete student
export function deleteStudentById(id: number) {
  const path = `students/${id}`;
  return httpDelete(path)
    .then((res) => res.data)
    .catch((err) => message.error("Delete students failed"));
}

// Course Lists
export function getCourseList(req: { page: number; limit: number }) {
  const path = "courses";
  return httpGet(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Get courses lists failed"));
}

// Get course details by id
export function getCourseDetails(id: number | string) {
  const path = `courses/detail?id=${id}`;
  return httpGet(path, {})
    .then((res) => res.data)
    .catch((err) => message.error("Get courses details failed"));
}

// Get teacher name by value
export function getTeacherList(value: string) {
  const path = `teachers?query=${value}`;
  return httpGet(path, {})
    .then((res) => res.data)
    .catch((err) => message.error("Get teacher list failed"));
}

// Get course type
export function getCourseType() {
  const path = "courses/type";
  return httpGet(path, {})
    .then((res) => res.data)
    .catch((err) => message.error("Get course type failed"));
}

// Get course Code
export function getCourseCode() {
  const path = "courses/code";
  return httpGet(path, {})
    .then((res) => res.data)
    .catch((err) => message.error("Get course code failed"));
}

// Add a course
export function postCourse(req: ICourse) {
  const path = "courses";
  return httpPost(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Post new course failed"));
}

// Edit schedule
export function putSchedule(req: IScheduleReq) {
  const path = "courses/schedule";
  return httpPut(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Edit course schedule failed"));
}

// Get course details by Id
export function getCourseByCourseId(id: number) {
  const path = `courses/detail?id=${id}`;
  return httpGet(path, {})
    .then((res) => res.data)
    .catch((err) => message.error("Get course details failed"));
}

// Get course details by uid, name, type
export function getCourseByCourseDetails(path:string) {
  const basePath = path;
  return httpGet(basePath, {})
    .then((res) => res.data)
    .catch((err) => message.error("Get course detail failed"));
}
