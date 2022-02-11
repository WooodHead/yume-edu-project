import React, { useEffect, useMemo, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import ManagerLayout from "../../../components/manager/manager-layout";
import { Table, Input, Space, Popconfirm, message } from "antd";
import { formatDistanceToNow } from "date-fns";
import AddStudent from "../../../components/manager/add-student";
import EditStudent from "../../../components/manager/edit-students";

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
      render: (courseItem) => {
        return courseItem.courses.map((item: { name: string }) => {
          return <span key="item.courseId">{item.name}</span>;
        });
      },
    },
    {
      key: "type",
      title: "Student Type",
      render: (data) => {
        return <p>{data.type.name}</p>;
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
      render: (obj: any) => (
        <Space size="middle">
          
          <EditStudent />
          

          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() =>{
           
             return confirm(obj)
              
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  // typescript的语法问题
  const [studentProfile, setStudentProfile] = useState<Record<string, any>>([]);
  const [searchValue, setSearchValue] = useState("");
  // pagination
  // # 每次点击分页都需要重新向后台请求数据
  // const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [deletedItem, setDeletedItem] = useState("");

  // get and show students list
  useEffect(() => {
    setLoading(true);
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    axios
      // 再看看API请求的资料
      .get("http://cms.chtoma.com/api/students?page=1&limit=0", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(function (response) {
        const { students } = response.data.data;
        const studentProfile = students;
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
  }, [page, searchValue, deletedItem]);



  // handle delete student action
  const confirm = (obj: any) => {
    const id: string = obj.id;

    console.log(id)
    const base = "http://cms.chtoma.com/api";
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    axios
      .delete(`${base}/students/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        // console.log(res);
        message.success("Delete Successfully");
        setDeletedItem(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Pagination function
  const data = useMemo(() => {
    return studentProfile.filter((item: { name: string }) => {
      if (searchValue === "") {
        return true;
      }
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, studentProfile]);



  return (
    <ManagerLayout>
      {/* 需要做下 breadcrumb */}
      <h1>CMS MANAGEMENT SYSTEM / Manager / Student List</h1>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            placeholder="input search text"
            size="middle"
            style={{ width: "30%" }}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <AddStudent />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            onChange: (page: number, pageSize: number) => {
              setPage(page);
              // setPageSize(pageSize);
            },
          }}
        />
      </div>
    </ManagerLayout>
  );
}
