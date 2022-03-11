import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/student/manager-layout";
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

const { Panel } = Collapse;

export default function CourseDetails() {
  const router = useRouter();
  const [courseData, setCourseData] = useState<ICourseDetails>({});
  const [sales, setSales] = useState<ICourseSales>({});

  // Get course details by Id
  useEffect(() => {
    const id = router.query.id;
    getCourseDetails(id).then((res) => {
      const { sales } = res;
      if (id) {
        setCourseData(res);
        setSales(sales);
      }
    });
  }, [router.query.id]);

  return (
    <ManagerLayout>
      <Row>
        <Col span={8}>
          <CourseCard {...courseData}>
            <Row style={{ display: "flex", justifyContent: "inherit" }}>
              <Col>
                <b>{sales.price}</b>
                <p>Price</p>
              </Col>
              <Col>
                <b>{sales.batches}</b>
                <p>Batches</p>
              </Col>
              <Col>
                <b>{sales.studentAmount}</b>
                <p>Students</p>
              </Col>
              <Col>
                <b>{sales.earnings}</b>
                <p>Earings</p>
              </Col>
            </Row>
          </CourseCard>
        </Col>
        <Col offset={1} span={15}>
          <Card>
            <h2>Course Detail</h2>

            <h3>Create Time</h3>
            <Row>{courseData?.createdAt}</Row>

            <h3>Start Time</h3>
            <Row>{courseData?.startTime}</Row>

            <h3>Status</h3>
            {
              console.log("xx",courseData)
            }

            <h3>Course Code</h3>
            <Row>{courseData?.uid}</Row>

            <h3>Class Time</h3>
            <Row>
              <WeekTable courseData={courseData} />
            </Row>

            <h3>Category</h3>
            <Row>
              {courseData?.type.map((type: IType, index: number) => {
                return (
                  <Tag color={programLanguageColors[index]} key={type.id}>
                    {type.name}
                  </Tag>
                );
              })}
            </Row>

            <h3>Description</h3>
            <Row>{courseData?.detail}</Row>

            <h3>Chapter</h3>
            <Collapse>
              {
                courseData?.schedule.chapters.map((obj:IChapters) => {
                  return <Panel header={obj.name} key={obj.id} >
                            {obj.content}
                         </Panel>
                })
              }
            </Collapse>

          </Card>
        </Col>
      </Row>
    </ManagerLayout>
  );
}
