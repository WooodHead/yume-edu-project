import { message } from 'antd';
import {httpDelete, httpGet, httpGetId, httpPost, httpPut} from './http'

interface GetStudentReq {
   [key: string]: string | number
}

// Login
export function postLogin(req: GetStudentReq){
    const path = "login";
    return httpPost(path, req).then(res => res.data).catch(err => message.error("login failed"))
}

// Logout
export function postLogout(){
    const path = "logout";
    return httpPost(path).then(res => res.data).catch(err => message.error("logout failed"))
}

// Add a student
export function postStudents(req: GetStudentReq){
    const path = "students";
    return httpPost(path,req).then(res => res.data).catch(err => message.error("Add students failed"))
}

export function putStudents(req: GetStudentReq){
    const path = "students";
    return httpPut(path,req).then(res => res.data).catch(err => message.error("Edit students failed"))
}

export function getStudents(req: GetStudentReq){
    const path = "students";
    return httpGet(path,req).then(res => res.data).catch(err => message.error("Get students failed"))
}

export function getStudentById(id: GetStudentReq){
    const path = `students/${id}`;
    return httpGetId(path).then(res => res.data).catch(err => message.error("Get students Id failed"))
}

export function deleteStudentById(id: GetStudentReq){
    const path = `students/${id}`;
    return httpDelete(path).then(res => res.data).catch(err => message.error("Delete students failed"))
}
