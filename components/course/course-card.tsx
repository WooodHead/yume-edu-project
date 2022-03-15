import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Row, Divider } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";
import { CourseCardProps, ICourseDetails } from "../../lib/model/course";

const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

export default function CourseCard(props: CourseCardProps) {
  const {
    id,
    cover,
    name,
    duration,
    teacherName,
    maxStudents,
    startTime,
    star,
    children,
  } = props;

  return (
    <Card
      key={id}
      cover={
        <img src={cover} alt="cover" style={{ width: "100%", height: 200 }} />
      }
    >
      <Row gutter={[6, 16]}>
        <h3>{name}</h3>
      </Row>

      <StyledRow gutter={[6, 16]}>
        <Col>{startTime}</Col>
        <Col>
          <HeartFilled style={{ marginRight: 5, fontSize: 16, color: "red" }} />
          <b>{star}</b>
        </Col>
      </StyledRow>
      <Divider style={{ margin: 0 }} />

      <StyledRow gutter={[6, 16]}>
        <Col>Duration:</Col>
        <Col>
          <b>{duration > 1 ? duration + " years" : duration + " year"}</b>
        </Col>
      </StyledRow>
      <Divider style={{ margin: 0 }} />

      <StyledRow gutter={[6, 16]}>
        <Col>Teacher:</Col>
        <Col>
          <Link href="/dashboard/manager" passHref>
            <b>
              <a>{teacherName}</a>
            </b>
          </Link>
        </Col>
      </StyledRow>
      <Divider style={{ margin: 0 }} />

      <StyledRow gutter={[6, 16]}>
        <Col>
          <UserOutlined
            style={{ marginRight: 5, fontSize: 16, color: "blue" }}
          />
          Student Limit:
        </Col>
        <Col>
          <b>{maxStudents}</b>
        </Col>
      </StyledRow>
      {children}
    </Card>
  );
}
