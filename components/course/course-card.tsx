import React from "react";
import "antd/dist/antd.css";
import { Button, Card, Col, Row, Divider } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

export default function CourseCard(props: {
  image;
  name;
  id;
  duration;
  teacher;
  studentLimit;
  startTime;
  star;
}) {
  const { id, image, name, duration, teacher, studentLimit, startTime, star } =
    props;

  return (
    <Card
      key={id}
      cover={<img src={image} style={{ width: "100%", height: 200 }} />}
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
        <Col>{duration}</Col>
      </StyledRow>
      <Divider style={{ margin: 0 }} />

      <StyledRow gutter={[6, 16]}>
        <Col>Teacher:</Col>
        <Col>{teacher}</Col>
      </StyledRow>
      <Divider style={{ margin: 0 }} />

      <StyledRow gutter={[6, 16]}>
        <Col>
          <UserOutlined
            style={{ marginRight: 5, fontSize: 16, color: "1890ff" }}
          />
          Student Limit:
        </Col>
        <Col>{studentLimit}</Col>
      </StyledRow>
      <Button type="primary" style={{ margin: " 5px 0" }}>
        Read More
      </Button>
    </Card>
  );
}
