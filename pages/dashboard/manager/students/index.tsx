import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/student/manager-layout";
import { Table, Input, Space, Popconfirm, message, Button } from "antd";
import { formatDistanceToNow } from "date-fns";
import AddEditStudent from "../../../../components/student/add-student";
import { deleteStudentById, getStudents } from "../../../api/api-service";
import { IStudent } from "../../../../lib/model/student";
import { CourseShort } from "../../../../lib/model/course";

const StudentList: React.FC = () => {
  const columns = [
    {
      title: "No.",
      key: "key",
      render: (_: unknown, _1: unknown, index: number) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      render(record: IStudent) {
        // console.log(record)
        return (
          <Link href={`/dashboard/manager/students/${record.id}`}>
            <a>{record.name}</a>
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
      dataIndex: "courses",
      render: (courses: CourseShort[]) => {
        return courses?.map((item) => item.name).join(", ");
      },
    },
    {
      dataIndex: "type",
      title: "Student Type",
      render: ( type: IStudent ) => {
        return <p>{type?.name}</p>
      }
    },
    {
      title: "Join Time",
      key: "createdAt",
      render: (obj: { createdAt: string }) => {
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
            onConfirm={() => confirm(record)}
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
  const [students, setStudents] = useState<Record<string, any>[]>([]); // store student data
  const [searchValue, setSearchValue] = useState(""); // store the value of input when searching
  const [total, setTotal] = useState(0); // store the total number of student
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [deletedItem, setDeletedItem] = useState("");
  const [updated, setUpdated] = useState(false);
  // const [paginator, setPaginator] = useState({
  //   pageSize: 10,
  //   page: 1,
  //   total: 0,
  // })
  // console.log("total", paginator)

  useEffect(() => {
    setLoading(true);
    // 如果有searchValue
    let path = `page=${page}&limit=${pageSize}`;
    if (searchValue) {
      path = `query=${searchValue}&page=${page}&limit=${pageSize}`;
    }
    getStudents({ page: page, limit: pageSize }).then((res) => {
      const { students } = res;
      const { total } = res;
      if (students) {
        setTotal(total);
        setStudents(students);
      }
    });
    setLoading(false);
  }, [page, pageSize, searchValue, deletedItem, updated]);

  // Search student
  const filteredData = useMemo(
    () =>
      students?.filter(
        (item) =>
          !searchValue ||
          item.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue, students]
  );

  // delete student
  const confirm = (record: any) => {
    const id = record.id;
    deleteStudentById(id).then(() => {
      setDeletedItem(id);
      message.success("Delete Successfully");
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
            },
          }}
        />
      </div>
    </ManagerLayout>
  );
};

export default StudentList;
