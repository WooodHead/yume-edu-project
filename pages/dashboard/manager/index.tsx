import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../components/layout";
import { Card, Col, Progress, Row, Select } from "antd";
import styled from "styled-components";
import {
  SolutionOutlined,
  DeploymentUnitOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import {
  getCourseStatistic,
  getOverview,
  getStudentStatistic,
  getTeacherStatistic,
} from "../../api/api-service";
import PieChart from "../../../components/manager/pie";
import { StudentType } from "../../../lib/model/student";
import { CourseType } from "../../../lib/model/course";
import LineChart from "../../../components/manager/line";
import BarChart from "../../../components/manager/bar";
import HeatChart from "../../../components/manager/heat";

const { Option } = Select;

const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .ant-card {
    border-radius: 5px;
    cursor: pointer;
    margin: 8px 12px;
  }
  .ant-card-body {
    padding: 24px;
  }
  .ant-col-6 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
  }
  .icon {
    height: 82px;
    display: flex;
    background: rgb(255, 255, 255);
    padding: 25px;
    border-radius: 50%;
    color: rgb(153, 153, 153);
  }
  h2,
  h3,
  p {
    color: rgb(255, 255, 255);
  }
`;

interface Overview {
  title: string;
  data: {
    lastMonthAdded: number;
    total: number;
  };
  background: string;
  icon: any;
}

export interface ITypes {
  name: string;
  amount: number;
}

export default function ManagerHomePage() {
  const [overview, setOverview] = useState<Overview[]>([]);
  const [types, setTypes] = useState<ITypes[]>([]);
  const [increase, setIncrease] = useState<number[]>([]);
  const [student, setStudent] = useState([]);
  const [course, setCourse] = useState([]);
  const [teacher, setTeacher] = useState([]);
  console.log("course array,", increase);

  useEffect(() => {
    getOverview().then((res) => {
      const overview: Overview[] = [
        {
          title: "course",
          data: res.course,
          background: "rgb(24, 144, 255)",
          icon: <SolutionOutlined />,
        },
        {
          title: "teacher",
          data: res.teacher,
          background: "rgb(103, 59, 183)",
          icon: <DeploymentUnitOutlined />,
        },
        {
          title: "student",
          data: res.student,
          background: "rgb(255, 170, 22)",
          icon: <ReadOutlined />,
        },
      ];
      setOverview(overview);
    });

    // student types
    getStudentStatistic().then((res) => {
      const types = [res.type];
      setTypes(types);

      // student increment
      const student = new Array(12).fill(0);
      res.createdAt.map((obj) => {
        if (obj.name.substr(-2)) {
          student.splice(
            obj.name.substr(-2) - 1,
            1,
            student[obj.name.substr(-2) - 1] + obj.amount
          );
        }
      });
      setStudent(student);
      console.log("student array", student);
    });

    // course increment
    getCourseStatistic().then((res) => {
      const course = new Array(12).fill(0);
      res.createdAt.map((obj) => {
        if (obj.name.substr(-2)) {
          course.splice(
            obj.name.substr(-2) - 1,
            1,
            course[obj.name.substr(-2) - 1] + obj.amount
          );
        }
      });
      setCourse(course);
    });

    // teacher increment
    getTeacherStatistic().then((res) => {
      const teacher = new Array(12).fill(0);
      res.createdAt.map((obj) => {
        if (obj.name.substr(-2)) {
          teacher.splice(
            obj.name.substr(-2) - 1,
            1,
            teacher[obj.name.substr(-2) - 1] + obj.amount
          );
        }
      });
      setTeacher(teacher);
    });
  }, []);

  return (
    <ManagerLayout>
      <StyledRow gutter={16} style={{ margin: "30px 0" }}>
        {overview.map(({ title, data, background, icon }, index) => {
          const lastMonthAdded = +(
            (data.lastMonthAdded / data.total) *
            100
          ).toFixed(1);

          return (
            <Col key={index} span="8">
              <Card style={{ backgroundColor: background }}>
                <Row>
                  <Col span="6">
                    <div className="icon">{icon}</div>
                  </Col>
                  <Col span="18">
                    <h3>TOTAL {title.toUpperCase()}</h3>
                    <h2>{data.total}</h2>
                    <Progress
                      percent={100 - lastMonthAdded}
                      size="small"
                      showInfo={false}
                      strokeColor="white"
                      trailColor="lightgreen"
                    />
                    <p>{`${lastMonthAdded + "%"} Increase in 30 Days`}</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </StyledRow>

      <Row gutter={16} style={{ margin: "30px 0" }}>
        {/* Map */}
        <Col span="12">
          <Card
            title="Distribution"
            style={{ padding: "24px" }}
            extra={
              <Select defaultValue="student" bordered={false}>
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            }
          ></Card>
        </Col>

        {/* Types */}
        <Col span="12">
          <Card
            title="Types"
            style={{ padding: "24px" }}
            extra={
              <Select
                defaultValue="student"
                bordered={false}
                onSelect={(value: string) => {
                  value === "student"
                    ? getStudentStatistic().then((res) => {
                        const types: ITypes[] = [res.type];
                        setTypes(types);
                      })
                    : value === "course"
                    ? getCourseStatistic().then((res) => {
                        const types = [res.type];
                        setTypes(types);
                        console.log(res);
                      })
                    : getOverview().then((res) => {
                        const student = [
                          { name: "female", amount: res.student.gender.female },
                          { name: "male", amount: res.student.gender.male },
                          {
                            name: "unknown",
                            amount: res.student.gender.unknown,
                          },
                        ];
                        const teacher = [
                          { name: "female", amount: res.teacher.gender.female },
                          { name: "male", amount: res.teacher.gender.male },
                          {
                            name: "unknown",
                            amount: res.teacher.gender.unknown,
                          },
                        ];
                        const types: ITypes[][] = [student, teacher];

                        setTypes(types);
                      });
                }}
              >
                <Option value="student">Student Type</Option>
                <Option value="course">Course Type</Option>
                <Option value="gender">Gender</Option>
              </Select>
            }
          >
          
            {types?.map((obj: ITypes) => {
              return <PieChart key={Math.random()} types={obj} />;
            })}
          
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ margin: "30px 0" }}>
        {/* Increment */}
        <Col span="12">
          <Card title="Increment" style={{ padding: "24px", width: "120%" }}>
            <LineChart increase={{ student, course, teacher }} />
          </Card>
        </Col>

        {/* Languages */}
        <Col span="12">
          <Card
            title="Languages"
            style={{ padding: "24px", width: "120%" }}
          >
            <BarChart />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ margin: "30px 0" }}>
            <Col span="24">
              <HeatChart />
            </Col>
      </Row>
    </ManagerLayout>
  );
}
