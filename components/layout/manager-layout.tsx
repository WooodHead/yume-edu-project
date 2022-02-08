import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import "antd/dist/antd.css";
import { Menu, Layout, Button } from "antd";
import Image from "next/image";
import logo from "../../public/logo.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MailOutlined,
  BellOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function ManagerLayout({ children }: any) {
  const router = useRouter();
  const onLogout = () => {
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    console.log(userToken);
    axios
      .post(
        "http://cms.chtoma.com/api/logout",
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then(function (response) {
        localStorage.removeItem("cms");
        router.push("/sign-in");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // handle current menu item  ？？？有问题
  const [currentMenuItem, setCurrentMenuItem] = useState('/manager'); 
  const handleClick = (e:any) => {
    console.log('click ', e);
    setCurrentMenuItem(
      e.key
    )
  }

  return (
    <div >
      <Head>
        <title>YumEdu Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout style={{ height: "100%" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={222}
          defaultCollapsed={true}
          collapsedWidth={100}
        >
          <Menu
            theme="dark"
            mode="inline"
            // 有问题
            onClick = {handleClick}
            selectedKeys={[currentMenuItem]}
            // 
            inlineCollapsed={collapsed}
            style={{ position: "sticky", top: "0" }}
          >
            <div
              style={{
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href="/" passHref>
                <span style={{ cursor: "pointer" }}>
                  <Image src={logo} alt="logo" width="70" height="70" />
                </span>
              </Link>
            </div>

            

            <Menu.Item key="/manager" icon={<UserOutlined />}>
              <Link href="/dashboard/manager">
                <a>Overview</a>
              </Link>
            </Menu.Item>

            <SubMenu icon={<MailOutlined />} title="Student">
              <Menu.Item key="manager/students">
                <Link href="/dashboard/manager/students">
                  <a>Student List</a>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub1" icon={<MailOutlined />} title="Teacher">
              <Menu.Item key="/manager/teacher">
                <Link href="/dashboard/manager/teacher">
                  <a>Teacher List</a>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<MailOutlined />} title="Course">
              <Menu.Item key="/manager/courses">
                <Link href="/dashboard/manager/courses">
                  <a>All Courses</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/manager/courses/add-course">
                <Link href="/dashboard/manager/courses/add-course">
                  <a>Add Course</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/manager/courses/edit-course">
                <Link href="/dashboard/manager/courses/edit-course">
                  <a>Edit Course</a>
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="/manager/message" icon={<UserOutlined />}>
              <Link href="/dashboard/manager/message">
                <a>Message</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout" >
          <Header
            className="site-layout-background"
            style={{
              padding: "0 50px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: "0",
              zIndex: "9",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                style: { fontSize: "30px", color: "white" },
                onClick: toggle,
              }
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
              <BellOutlined
                style={{
                  color: "white",
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "0 30px",
                }}
              />

              <Button
                onClick={onLogout}
                icon={<UserOutlined />}
                shape="circle"
              ></Button>
            </div>
          </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              backgroundColor: 'white'
            }}
          >
            <h1>CMS MANAGEMENT SYSTEM {currentMenuItem}</h1>
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
