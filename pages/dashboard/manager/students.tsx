import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import ManagerLayout from "../../../components/layout/manager-layout";
import { Table, Button, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";


const { Search } = Input;

const columns = [
  {
    // ？排序
    title: "No.",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Area",
    dataIndex: "country",
    key: "area",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    // ？如何获取course.name
    title: "Selected Curriculum",
    dataIndex: "courses.name",
    key: "courses",
  },
  {
    title: "Student Type",
    dataIndex: "",
    key: "type",
  },
  {
    // ？时间
    title: "Join Time",
    dataIndex: "createAt",
    key: "createAt",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function StudentList() {
  const [studentProfile, setStudentProfile] = useState([]);

  // get students data
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    axios
      .get("http://cms.chtoma.com/api/students?page=1&limit=20", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(function (response) {       
        // console.log(response.data.data.students[0]);

        const studentProfile = response.data.data.students
        if(studentProfile){
          setStudentProfile(studentProfile);
        }       
      })
      .catch(function (error) {
        console.log(error);
      });
  },[]);

  return (
    <ManagerLayout>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="middle"
            style={{ width: "30%" }}
          />
          <Button>
            <PlusOutlined />
            Add
          </Button>
        </div>

        <Table columns={columns} dataSource={studentProfile} rowKey="id" />
      </div>
    </ManagerLayout>
  );
}
