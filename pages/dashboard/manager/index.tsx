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
} from "../../api/api-service";
import PieChart from "../../../components/manager/pie";
import { StudentType } from "../../../lib/model/student";
import { CourseType } from "../../../lib/model/course";

const { Option } = Select;

const StyledCard = styled(Row)`
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
  .icon-layout {
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

export default function ManagerHomePage() {
  const [overview, setOverview] = useState<Overview[]>([]);
  const [typeSelector, setTypeSelector] = useState("studentType");
  const [studentType, setStudentType] = useState<StudentType[]>([]);
  const [courseType, setCourseType] = useState<CourseType[]>([]);
  const [gender, setGender] = useState({
    student: {},
    teacher: {},
  });
  console.log("gender statistics", gender);

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

    // Get student statistics data
    getStudentStatistic().then((res) => {
      setStudentType(res.type);
      console.log("student statistic", res);
    });

    // Get course statistics data
    getCourseStatistic().then((res) => {
      setCourseType(res.type);
      console.log("course statistic", res);
    });

    // Get gender
    getOverview().then((res) => {
      setGender({ student: res.student.gender, teacher: res.teacher.gender });
      console.log("gender statistics", gender);
    });
  }, []);

  return (
    <ManagerLayout>
      <Row gutter={16} style={{ margin: "30px 0" }}>
        <StyledCard>
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
                      <div className="icon-layout">{icon}</div>
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
        </StyledCard>
      </Row>

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

        <Col span="12">
          <Card
            title="Types"
            style={{ padding: "24px" }}
            extra={
              <Select
                defaultValue="studentType"
                bordered={false}
                onSelect={(el: string) => {
                  if (el) {
                    setTypeSelector(el);
                  }
                }}
              >
                <Option value="studentType">Student Type</Option>
                <Option value="courseType">Course Type</Option>
                <Option value="gender">Gender</Option>
              </Select>
            }
          >
            {(() => {
              switch (typeSelector) {
                case "studentType":
                  return (
                    <PieChart studentType={studentType} title="Student Type" />
                  );

                case "courseType":
                  return (
                    <PieChart courseType={courseType} title="Course Type" />
                  );

                case "gender":
                  return <PieChart gender={gender}  title="Gender" />;

                // default:
                //   return <PieChart studentType={studentType} />;
              }
            })()}
          </Card>
        </Col>
      </Row>
    </ManagerLayout>
  );
}
