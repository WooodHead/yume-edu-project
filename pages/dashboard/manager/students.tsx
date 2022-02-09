import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import ManagerLayout from "../../../components/layout/manager-layout";
import { Table, Button, Input, Space, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const columns = [
  {
    // ？排序
    title: "No.",
    
    key: "id",
    render (_: unknown, _2: unknown, index: number) {
      return index + 1;
    },
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
    // render:
  },
  {
    key: "type",
    title: "Student Type",
    dataIndex: "type[1].name",
    // render: (tester: string) => {
    //   return <p>{tester ? "tester" : "developer"}</p>;
    // },
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
  const [loading, setLoading] = useState(false);
  const [studentProfile, setStudentProfile] = useState([]);
  const [inputTerm, setInputTerm] = useState("");

  // get students data
  useEffect(() => {
    setLoading(true);

    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    axios
      .get("http://cms.chtoma.com/api/students?page=1&limit=20", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(function (response) {
        // console.log(response.data.data.students);

        const studentProfile = response.data.data.students;
        if (studentProfile) {
          setStudentProfile(studentProfile);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // search filter bar
  useEffect(() => {
    if (inputTerm !== "") {
      console.log(inputTerm);

      const newProfile = studentProfile.filter((profile) => {
        if (profile.name.toLowerCase().includes(inputTerm.toLowerCase())) {
          console.log(profile);
          return profile;
        }
      });
      setStudentProfile(newProfile);
    }
  }, [inputTerm]);

  return (
    <ManagerLayout>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            placeholder="input search text"
            onChange={(e) => setInputTerm(e.target.value)}
            size="middle"
            style={{ width: "30%" }}
          />
          <Button>
            <PlusOutlined />
            Add
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={studentProfile}
          loading={loading}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </ManagerLayout>
  );
}
