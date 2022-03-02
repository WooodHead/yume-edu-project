import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Card, Col, Row, Table, Tabs, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import ManagerLayout from "../../../../components/student/manager-layout";
import { getStudentById } from  "../../../api/api-service";;

export const H2 = styled.h2`
  color: #7356f1;
  margin: 20px 0px;
  font-size: 24px;
`;

export default function StudentInfo(props: { id: number }) {
  const columns = [
    {
      title: "No.",
      key: "key",
      render: (_1: any, _2: any, index: number) => index + 1,
    },
    {
      title: "Name",
      key: "courses",
      render: (obj: { name: string }) => <a>{obj.name}</a>,
    },
    {
      title: "Type",
      key: "type",
      render: (obj) => {
        return obj.type.map((item: { id: number; name: string }) => (
          <p key={Math.random()}>{item.name}</p>
        ));
      },
    },
    {
      title: "Join Time",
      key: "createdAt",
      render: (obj: any) => <p>{obj.createdAt}</p>,
    },
  ];

  const { TabPane } = Tabs;
  const router = useRouter();
  const [data, setData] = useState();
  const [info, setInfo] = useState<{ label: string; value: string | number }[]>(
    []
  );
  const [aboutInfo, setAboutInfo] = useState([]);
  const [courses, setCourses] = useState([]);

  // GET student info
  useEffect(() => {
    const id = router.query.id;
    getStudentById(id).then((res) => {
    const {data} = res;
      const info = [
        { label: "Name", value: data.name },
        { label: "Age", value: data.age },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { address: data?.address },
      ];

       const aboutInfo = [
      { label: "Eduction", value: data.education },
      { label: "Area", value: data.country },
      { label: "Gender", value: data.gender === 1 ? "Male" : "Female" },
      {
        label: "Member Period",
        value: data.memberStartAt + " - " + data.memberEndAt,
      },
      { label: "Type", value: data.type.name },
      { label: "Create Time", value: data.ctime },
      { label: "Update Time", value: data.updateAt },
    ];
      setInfo(info);
      setAboutInfo(aboutInfo);
      setCourses(data.courses);
      setData(data);
    });
   
  }, [router.query.id]);

  return (
    <ManagerLayout>
      <Row gutter={64}>
        {/* student info */}
        <Col span={8}>
          <Card
            title={
              <Avatar
                icon={<UserOutlined />}
                style={{
                  width: 100,
                  height: 100,
                  display: "block",
                  margin: "auto",
                }}
              />
            }
          >
            {/*** 4. 遍历info数组 */}
            <Row gutter={[6, 16]}>
              {info.map((item) => (
                <Col span={12} key={item.label} style={{ textAlign: "center" }}>
                  <b>{item.label}</b>
                  <p>{item?.value}</p>
                </Col>
              ))}
            </Row>
            <Row gutter={[6, 16]}>
              <Col span={24} style={{ textAlign: "center" }}>
                <b>Address</b>
                {/*  允许address为空*/}
                <p></p>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* about & courses */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="About" key="1">
                <H2>Information</H2>
                <Row gutter={[6, 16]}>
                  {aboutInfo.map((item) => (
                    <Col span={24} key={item.label}>
                      <strong style={{ width: 150, display: "inline-block" }}>
                        {item.label} :
                      </strong>
                      <span>{item?.value}</span>
                    </Col>
                  ))}
                </Row>

                <H2>Interesting</H2>
                <Row>
                  <Col>
                    {data?.interest.map((item: string) => {
                      // console.log(data.interest)
                      return (
                        <Tag key={item} style={{ padding: "5px 10px" }}>
                          {item}
                        </Tag>
                      );
                    })}
                  </Col>
                </Row>

                <H2>Description</H2>
                <Row><Col>{data?.description}</Col></Row>
              </TabPane>

              <TabPane tab="Courses" key="2">
                <Table columns={columns} dataSource={courses}></Table>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </ManagerLayout>
  );
}
