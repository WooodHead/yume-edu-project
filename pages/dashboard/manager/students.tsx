import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import ManagerLayout from "../../../components/layout/manager-layout";
import { Table, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;


const data = [
    {
        id: 1,
        name: "admin",
        typeId: 2,
        country: "New Zealand",
        ctime: "2020-06-19 15:29:58",
        email: "student@admin.com",
        updateAt: "2020-11-23 13:22: 03",
        studentCourseIds: [10, 11, 12, 21],
        profileId: 1
      },
      {
        id: 1,
        name: "admin",
        typeId: 2,
        country: "New Zealand",
        ctime: "2020-06-19 15:29:58",
        email: "student@admin.com",
        updateAt: "2020-11-23 13:22: 03",
        studentCourseIds: [10, 11, 12, 21],
        profileId: 1
      },
      {
        id: 1,
        name: "admin",
        typeId: 2,
        country: "New Zealand",
        ctime: "2020-06-19 15:29:58",
        email: "student@admin.com",
        updateAt: "2020-11-23 13:22: 03",
        studentCourseIds: [10, 11, 12, 21],
        profileId: 1
      },
  ];
  const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
  ];

export default function StudentList() {
  const getStudent = () => {    
    axios
      .get("https://img.showdoc.cc/2020-12-30_5feb8a2decd92.json?e=1644322611&token=-YdeH6WvESHZKz-yUzWjO-uVV6A7oVrCN3UXi48F:i3VF-oeRizaqrJIg6oQd_pobT54=", {
    
      })
      .then((response) => {
        console.log(response.data);
      }).catch( (error) => {
 
        console.log(error);
      });
  };

  
  return (
    <ManagerLayout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="middle"
          style={{ width: "30%" }}
        />
        <Button onClick={getStudent}>
          <PlusOutlined />
          Add
        </Button>
      </div>

      <Table columns={columns} dataSource={data}  />

    </ManagerLayout>
  );
}
