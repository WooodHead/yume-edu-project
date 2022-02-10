import React, { useEffect, useMemo, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import ManagerLayout from "../../../components/layout/manager-layout";
import { Table, Button, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";


export default function StudentList() {
  const columns = [
    {
      title: "No.",
      key: "key",
      render(_: unknown, _1: unknown, index: number) {
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
      title: "Selected Curriculum",
      key: "courses",
      render: (courseItem: any) => {
        return courseItem.courses.map((item: any) => {
          return <span key="item.courseId">{item.name}</span>;
        });
      },
    },
    {
      key: "type",
      title: "Student Type",
      render: (typeItem: object) => {
        return <p>{typeItem.type.name}</p>;
      },
    },

    {
      // 引入了一个data-fns api
      title: "Join Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: number) => {
        var result = formatDistanceToNow(new Date(date));
        return <p>{result}</p>;
      },
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

  const [loading, setLoading] = useState(false);
  // typescript的语法问题
  const [studentProfile, setStudentProfile] = useState<Record<string,any>>([]);
  const [searchValue, setSearchValue] = useState("");

  // search filter bar
  // useEffect(() => {
  //   if (inputTerm !== "") {
  //     console.log(inputTerm);

  //     const newProfile = studentProfile.filter((profile) => {
  //       if (profile.name.toLowerCase().includes(inputTerm.toLowerCase())) {
  //         console.log(profile);
  //         return profile;
  //       }
  //     });
  //     setStudentProfile(newProfile);
  //   }
  // }, [inputTerm]);

  // pagination
  // # 每次点击分页都需要重新向后台请求数据
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);

  // get students data
  useEffect(() => {
    setLoading(true);

    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    axios
      // 再看看API请求的资料
      .get("http://cms.chtoma.com/api/students?page=1&limit=0", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(function (response) {
        // console.log(response.data.data.students);
        const { students } = response.data.data;
        const studentProfile = students;
        // console.log(studentProfile);

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
    // # 每次点击分页都需要重新向后台请求数据 ( page改变，重新渲染一次 )
  }, [page, searchValue]);


  const data = useMemo(() => {
    return studentProfile.filter((item:any) => {
      if (searchValue === "") {
        return true;
      }
      return (item.name.toLowerCase() as unknown as string).includes(searchValue);
    });
  }, [searchValue, studentProfile]);



  return (
    <ManagerLayout>
      <h1>CMS MANAGEMENT SYSTEM / Manager / Student List</h1>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            placeholder="input search text"
            size="middle"
            style={{ width: "30%" }}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button>
            <PlusOutlined />
            Add
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            onChange: (page: number, pageSize: number) => {
              setPageSize(page);
            },
          }}
        />
      </div>
    </ManagerLayout>
  );
}
