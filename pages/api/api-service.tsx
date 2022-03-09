import { message } from "antd";
import { httpDelete, httpGet, httpPost, httpPut } from "./http";

interface GetReq {
  [key: string]: string | number;
}

// Login
const path = "login";
export function postLogin(req: GetReq) {
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
export function postStudents(req: GetReq) {
  const path = "students";
  return httpPost(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Add students failed"));
}

// Edit a student
export function putStudents(req: GetReq) {
  const path = "students";
  return httpPut(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Edit students failed"));
}

// Show student lists
export function getStudents(req: GetReq) {
  let path = "students";

  return httpGet(path, req)
    .then((res) => res.data)
    .catch((err) => message.error("Get students failed"));
}

//
export function getStudentById(req: GetReq) {
  const path = `students/${req}`;
  return httpGet(path,{})
    .then((res) => res)
    .catch((err) => message.error("Get students Id failed"));
}

// Delete student
export function deleteStudentById(id: GetReq) {
  const path = `students/${id}`;
  return httpDelete(path)
    .then((res) => res.data)
    .catch((err) => message.error("Delete students failed"));
}


// Course Lists
export function getCourseList(req:GetReq){
  const path = 'courses';
  return httpGet(path,req)
  .then((res) => res.data)
  .catch((err) => message.error("Get courses lists failed"))
}