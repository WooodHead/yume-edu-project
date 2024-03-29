import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import { Layout, Button, Breadcrumb, Menu } from "antd";
import Image from "next/image";
import logo from "../public/logo.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { removeUser } from "../lib/utils/storageUtils";
import { postLogout } from "../pages/api/api-service";
import { ISideNav, menuItems } from "../lib/menu-item";

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

export default function ManagerLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  // Logout
  const onLogout = () => {
    postLogout().then(() => {
      removeUser();
      router.push("/login");
    });
  };

  // test
 
  // const url = window.location.toString()
  // const activeKey = url.split('/').pop() 



  const renderMenuItems = (menuItems: ISideNav[]) => {
    return menuItems.map((menu: ISideNav) => {
      if (!(menu.subNav && menu.subNav.length)) {
        // 没有subNav & subNav.length

        let a = ["/dashboard", "manager", menu.path];
        if (!menu.path) {
          a = ["/dashboard", "manager"];
        }
        const pathRoute = a.join("/");

        return (
          <Menu.Item key={menu.key} icon={<menu.icon />}>
            <Link href={pathRoute}>{menu.label}</Link>
            {/* {console.log(menu.key)} */}
          </Menu.Item>
        );
      } else {
        return (
          <Menu.SubMenu title={menu.label} key={menu.key} icon={<menu.icon />}>
            {renderMenuItems(menu.subNav)}
          </Menu.SubMenu>
        );
      }
    });
  };
  

  return (
    <div>
      <Head>
        <title>YumEdu Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
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
            inlineCollapsed={collapsed}
            style={{ position: "sticky", top: "0" }}
            // defaultSelectedKeys={[activeKey]}
            
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

            {renderMenuItems(menuItems)}
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
            className="site-layout-background "
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "calc(100vh - 128px) ",
              backgroundColor: "white",
            }}
          >
            {/* <Breadcrumb routes={routes} /> */}

            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
