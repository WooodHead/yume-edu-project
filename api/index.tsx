/*
 *  api requests methods
 */
import ajax from "./api";
import { getUserToken } from "../utils/storageUtils";

// signIn
export const reqSignIn = (email: string, password: string, role: string) =>
  ajax("/login", "POST", { email, password, role });

// sign out
export const reqSignOut = () => {
  const userToken = getUserToken();
  ajax(
    "/logout",
    "POST",
    {},
    {
      headers: { Authorization: `Bearer ${userToken}` },
    }
  );
};

// show student list
export const reqShowStudentList = (page: number, pageSize: number) => {
  const userToken = getUserToken();
  return ajax(
    `/students?page=${page}&limit=${pageSize}`,
    "GET",
    {},
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
};

// delete a student
export const reqDeleteStudent = (id: number) => {
  const userToken = getUserToken();
  ajax(
    `/students/${id}`,
    "DELETE",
    {},
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
};

// add a new student
export const reqAddStudent = (student: any) =>
  ajax("/students", "POST", student); // 接收student对象
