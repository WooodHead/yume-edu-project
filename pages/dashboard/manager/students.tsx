import React, { useEffect, useMemo, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import ManagerLayout from "../../../components/student/manager-layout";
import { Table, Input, Space, Popconfirm, message, Pagination } from "antd";
import { formatDistanceToNow } from "date-fns";
import AddEditStudent from "../../../components/student/add-student";

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
      render: (
        _: unknown,
        obj: { courses: { name: string; courseId: number } },
        _1: unknown
      ): string => {
        const courses = obj.courses;
        return courses.map((item) => {
          return <span key={item.courseId}>{item.name}</span>;
        });
      },
    },
    {
      key: "type",
      title: "Student Type",

      // Typescript 类型问题
      render: (_: unknown, obj: { type: { name: number } }, _1: unknown) => {
        return <p>{obj.type.name}</p>;
      },
    },

    {
      // 引入了一个data-fns api
      title: "Join Time",
      key: "createdAt",
      render: (obj: any) => {
        const result = formatDistanceToNow(new Date(obj.createdAt));
        return <p>{result}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: {
        name: string;
        email: string;
        country: string;
        id: number;
      }) => (
        <Space size="middle">
          {/* to edit student profile */}
          <AddEditStudent {...record} />

          {/* to delete student */}
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              return confirm(record);
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

  const [loading, setLoading] = useState(false); // loading effect
  const [studentProfile, setStudentProfile] = useState<Record<string, any>[]>(
    []
  ); // store student data
  const [searchValue, setSearchValue] = useState(""); // store the value of input when searching
  const [total, setTotal] = useState(); // store the total number of student data in server
  // pagination # 每次点击分页都需要重新向后台请求数据
  // page pageSize ---> 写成 object ?
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [deletedItem, setDeletedItem] = useState("");

  // get and show students list
  useEffect(() => {
    setLoading(true);
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    axios
      // 再看看API请求的资料
      .get(
        `http://cms.chtoma.com/api/students?page=${page}&limit=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then(function (response) {
        const { students } = response.data.data;
        const { total } = response.data.data;

        if (students) {
          setTotal(total);
          setStudentProfile(students);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // # 每次点击分页都需要重新向后台请求数据 ( page等改变，重新渲染一次 )
  }, [page, pageSize, searchValue, deletedItem]);

  // Search student
  const filteredData = useMemo(
    () =>
      studentProfile.filter(
        (item) =>
          !searchValue ||
          item.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue, studentProfile]
  );

  // handle delete student action
  const confirm = (record: any) => {
    const id: string = record.id;
    const base = "http://cms.chtoma.com/api";
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    axios
      .delete(`${base}/students/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        message.success("Delete Successfully");
        setDeletedItem(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ManagerLayout> 
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Search by student name */}
          <Input
            placeholder="input search text"
            size="middle"
            style={{ width: "30%" }}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <AddEditStudent />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(page: number, pageSize: number) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </ManagerLayout>
  );
}
