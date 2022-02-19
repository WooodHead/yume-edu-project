import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "antd/dist/antd.css";
import axios from "axios";
import ManagerLayout from "../../../../components/student/manager-layout";
import { Table, Input, Space, Popconfirm, message } from "antd";
import { formatDistanceToNow } from "date-fns";
import AddEditStudent from "../../../../components/student/add-student";
import { reqDeleteStudent, reqShowStudentList } from "../../../../api";

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
      key: "name",
      render(obj: { name: string; id: number }, _: unknown, _1: number) {
        return (
          // 动态路由传参 + 跳转页面接收参数 [id].tsx
          <Link href={`/dashboard/manager/students/${obj.id}`}>
            <a>{obj.name}</a>
          </Link>
        );
      },
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
      render: (
        id: number,
        record: { name: string; country: string; email: string; type: number }
      ) => (
        <Space size="middle">
          {/* to edit student profile */}
          <AddEditStudent
            id={id}
            {...record}
            updated={updated}
            setUpdated={setUpdated}
          />

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
  const [total, setTotal] = useState(0); // store the total number of student data in server
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // const [paginator, setPaginator] = useState({
  //   pageSize: 10,
  //   page: 1,
  //   total: 0,
  // })
  // console.log("total", paginator)
  const [deletedItem, setDeletedItem] = useState("");
  const [updated, setUpdated] = useState(false); //refresh数据源（传递到AddEditStudent组件）

  useEffect(() => {
    setLoading(true);
    // 如果有searchValue
    let path = `page=${page}&limit=${pageSize}`;
    if (searchValue) {
      path = `query=${searchValue}&page=${page}&limit=${pageSize}`;
    }
    // fetch students list
    async function fetchData() {
      const res = await reqShowStudentList(page, pageSize);
      const { students } = res.data.data;
      const { total } = res.data.data;
      if (students) {
        setTotal(total);
        setStudentProfile(students);
      }
    }
    fetchData();
    setLoading(false);
  }, [page, pageSize, searchValue, deletedItem, updated]);

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

  // delete student 
  const confirm = async (record: any) => {
    const id: string = record.id;
    const result = await reqDeleteStudent(id);
    setDeletedItem(id);
    message.success("Delete Successfully");
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
          <AddEditStudent updated={updated} setUpdated={setUpdated} />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,

            onChange(page: number, pageSize: number) {
              setPage(page);
              setPageSize(pageSize);
              setTotal(total);
              // setPaginator({...paginator,page,pageSize})
            },
          }}
        />
      </div>
    </ManagerLayout>
  );
}
