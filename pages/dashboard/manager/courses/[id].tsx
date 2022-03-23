import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/layout";
import { useRouter } from "next/router";
import CourseCard from "../../../../components/course/course-card";
import { getCourseDetails } from "../../../api/api-service";
import {
  IChapters,
  ICourseDetails,
  ICourseSales,
  IType,
} from "../../../../lib/model/course";
import { Card, Col, Collapse, Row, Tag } from "antd";
import WeekTable from "../../../../components/common/week-table";
import { programLanguageColors } from "../../../../lib/model/config";
import styled from "styled-components";

const StyledRow = styled(Row)`
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-evenly;
  border: 1px solid #f0f0f0;
  border-top: none;
  border-right: none;
  p {
    margin-bottom: 0;
  }
  b {
    color: #7356f1;
    font-size: 24px;
  }
`;

const StyledCol = styled(Col)`
  text-align: center;
  border-right: 1px solid #f0f0f0;
`

const H3 = styled.h3`
  margin: 16px 0;
`

const { Panel } = Collapse;

export default function CourseDetails() {
  const router = useRouter();
  const [courseData, setCourseData] = useState<ICourseDetails>({});
  const [sales, setSales] = useState<ICourseSales>({});

  // Get course details by Id
  useEffect(() => {
    const id = router.query.id as string | number;

    if (!id) {
      return;
    }

    getCourseDetails(id).then((res) => {
      const { sales } = res;
      setCourseData(res);
      setSales(sales);
    });
  }, [router.query.id]);

  return (
    <ManagerLayout>
      <Row>
        <Col span={8}>
          <CourseCard {...courseData}></CourseCard>
          <StyledRow>
            <StyledCol span={6}>
              <b>{sales?.price}</b>
              <p>Price</p>
            </StyledCol >
            <StyledCol span={6}>
              <b>{sales?.batches}</b>
              <p>Batches</p>
            </StyledCol >
            <StyledCol span={6}>
              <b>{sales?.studentAmount}</b>
              <p>Students</p>
            </StyledCol >
            <StyledCol span={6}>
              <b>{sales?.earnings}</b>
              <p>Earings</p>
            </StyledCol >
          </StyledRow>
        </Col>
        <Col offset={1} span={15}>
          <Card>
            <h2 style={{color:'#7356f1', fontSize:'24px'}}>Course Detail</h2>

            <H3>Create Time</H3>
            <Row>{courseData?.createdAt}</Row>

            <H3>Start Time</H3>
            <Row >{courseData?.startTime}</Row>

            <H3>Status</H3>

            <H3>Course Code</H3>
            <Row>{courseData?.uid}</Row>

            <H3>Class Time</H3>
            <Row >
              <WeekTable courseData={courseData} />
            </Row>

            <H3>Category</H3>
            <Row style={{width: '100%'}}>
              {courseData?.type?.map((type: IType, index: number) => (
                <Tag color={programLanguageColors[index]} key={type.id}>
                  {type.name}
                </Tag>
              ))}
            </Row>

            <H3>Description</H3>
            <Row>{courseData?.detail}</Row>

            <H3>Chapter</H3>
            <Collapse>
              {courseData?.schedule?.chapters.map((obj) => (
                <Panel header={obj.name} key={obj.id}>
                  {obj.content}
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </ManagerLayout>
  );
}
