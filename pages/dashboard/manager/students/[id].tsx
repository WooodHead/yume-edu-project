import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Col, Row, Tabs, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import ManagerLayout from "../../../../components/student/manager-layout";
import axios from "axios";

// styled-components
export const H2 = styled.h2`
  color: #7356f1;
  margin: 20px 0px;
  font-size: 24px;
`;

/*
 *    动态路由传参 + 跳转页面接收参数
 *    创建动态路由在pages文件夹下 创建接收参数页面[id].tsx
 *    参考：https://www.jianshu.com/p/7d7756c4a927
 *         https://nextjs.org/docs/api-reference/next/router#userouter
 *
 */
export default function StudentInfo(props: { id: number }) {
  const { TabPane } = Tabs;
  const router = useRouter();
  const id = router.query.id; //** 1. 传递进来的参数在router.query.id中
  // console.log("query", id);
  // console.log("props", props); // undefined 空的 (const id = +router.query.id || props.id; 是什么意思)

  const [info, setInfo] = useState([]); //** 2. 数组形式存储提取出来的学生信息
  const [aboutInfo, setAboutInfo] = useState([]);
  const [interest, setInterest] = useState([]);
  const [description, setDescription] = useState("");
  // Right Side Title

  // GET student info
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user") as string).token;
    axios
      .get(`http://cms.chtoma.com/api/students/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        const { data } = response.data;
        const { interest } = response.data.data; // 解构赋值，放到setInterest
        const { description } = response.data.data;
        // console.log("data", data);
        setInterest(interest);
        setDescription(description);

        //**  3. 创建数组存储获取的到的学生info，并setInfo
        const info = [
          { label: "Email", value: data.name },
          { label: "Email", value: data.age },
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
        // console.log("接收到的info", info[0].value);
        setAboutInfo(aboutInfo);
        // console.log("接收到的aboutInfo", aboutInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function callback(key) {
    console.log(key);
  }

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
                  <p>{item.value}</p>
                </Col>
              ))}
            </Row>
            <Row gutter={[6, 16]}>
              <Col span={24} style={{ textAlign: "center" }}>
                <b>Address</b>
                {/*  允许address为空*/}
                <p>{info[4]?.address}</p>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* about & courses */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="About" key="1">
                <H2>Information</H2>
                <Row gutter={[6, 16]}>
                  {aboutInfo.map((item) => (
                    <Col span={24} key={item.label}>
                      <strong style={{ width: 150, display: "inline-block" }}>
                        {item.label} :
                      </strong>
                      <span>{item.value}</span>
                    </Col>
                  ))}
                </Row>

                <H2>Interesting</H2>
                <Row>
                  <Col>
                    {interest.map((item) => {
                      return <Tag key={item}>{item}</Tag>;
                    })}
                  </Col>
                </Row>

                <H2>Description</H2>
                <Row>
                  <Col>{description}</Col>
                </Row>
              </TabPane>

              <TabPane tab="Courses" key="2">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </ManagerLayout>
  );
}
