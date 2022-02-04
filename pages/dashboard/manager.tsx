import React from "react";
import Link from "next/link";
import "antd/dist/antd.css";
import { Menu, Layout } from "antd";
import Image from "next/image";
import logo from "../../public/logo.png";
import user from "../../public/user.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BellOutlined,
  UploadOutlined,
  MailOutlined,
} from "@ant-design/icons";
import OverviewContent from "../../components/content";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class LeftNav extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={222}
          defaultCollapsed={true}
          collapsedWidth={100}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            inlineCollapsed={this.state.collapsed}
            style={{position:'sticky', top: '0'}}
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
            <Menu.Item key="1" icon={<UserOutlined />}>
              Overview
            </Menu.Item>

            <SubMenu icon={<MailOutlined />} title="Student">
              <Menu.Item>Student List</Menu.Item>
            </SubMenu>

            <SubMenu icon={<MailOutlined />} title="Teacher">
              <Menu.Item>Teacher List</Menu.Item>
            </SubMenu>

            <SubMenu icon={<MailOutlined />} title="Course">
              <Menu.Item key="5">All Course</Menu.Item>
              <Menu.Item key="6">Add Course</Menu.Item>
              <Menu.Item key="7">Edit</Menu.Item>
            </SubMenu>

            <Menu.Item icon={<UserOutlined />}>Massage</Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: "0 50px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position:'sticky',
              top: "0",
              zIndex:'9'
            }}
          >
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                style: { fontSize: "30px", color: "white" },
                onClick: this.toggle,
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

              <Image src={user} alt="avatar" width="30" height="30" />
            </div>
          </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <OverviewContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
