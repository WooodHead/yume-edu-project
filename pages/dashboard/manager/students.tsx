import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import ManagerLayout from "../../../components/layout/manager-layout";
import { Table, Button, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

const columns = [
  {
    title: "No.",
    dataIndex: "index",
    key: "index",
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
    title: "Selected Curriculum",
    dataIndex: "studentCourseIds",
    key: "",
  },
  {
    title: "Student Type",
    dataIndex: "typeId",
    key: "",
  },
  {
    title: "Join Time",
    dataIndex: "ctime",
    key: "",
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
  const [studentsData, setStudentsDate] = useState([]);

  // const getStudent = () => {
  //   axios
  //     .get(
  //       "https://img.showdoc.cc/2020-12-30_5feb8a2decd92.json?e=1644328509&token=-YdeH6WvESHZKz-yUzWjO-uVV6A7oVrCN3UXi48F:bciDaN_4nMLY5HM3IFCp4aWKeb8="
  //     )
  //     .then(function (response) {
  //       // console.log(response.data[0].name);
  //       setStudentsDate(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  useEffect(()=>{
    axios
      .get(
        "https://img.showdoc.cc/2020-12-30_5feb8a2decd92.json?e=1644328509&token=-YdeH6WvESHZKz-yUzWjO-uVV6A7oVrCN3UXi48F:bciDaN_4nMLY5HM3IFCp4aWKeb8="
      )
      .then(function (response) {
        // console.log(response.data[0].name);
        setStudentsDate(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  })

  return (
    <ManagerLayout>
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

      <Table columns={columns} dataSource={studentsData} rowKey="id" />
    </ManagerLayout>
  );
}
