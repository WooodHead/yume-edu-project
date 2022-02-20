/*
 *  api requests methods
 */
import ajax from "./api";
import { getUserToken } from "../utils/storageUtils";

interface EditStudentValue {
  name?: string;
  email?: string;
  country?: string;
  id?: number;
  type?: number;
  updated?: unknown;
  setUpdated?: unknown;
}

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
export const reqAddStudent = ({
  name,
  country,
  email,
  type,
}: EditStudentValue) => {
  const userToken = getUserToken();
  ajax(
    "/students",
    "POST",
    {
      name,
      country,
      email,
      type,
    },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
};

// edit a student
export const reqEditStudent = ({
  id,
  name,
  country,
  email,
  type,
}: EditStudentValue) => {
  const userToken = getUserToken();
  ajax(
    "/students",
    "PUT",
    {
      id,
      name,
      country,
      email,
      type,
    },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
};

// get student info by id
export const reqGetStudentInfo = (id: number) => {
  const userToken = getUserToken();
  return ajax(`/students/${id}`, "GET", {},{ headers: { Authorization: `Bearer ${userToken}` }})
}