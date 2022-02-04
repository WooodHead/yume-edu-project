import React from "react";
import Link from "next/link";
import signStyle from "../styles/sign.module.css";

import { Layout, Input, Button, Checkbox, Form, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Typography } from "antd";

// import styled from "styled-components"

const { Title } = Typography;
const { Content } = Layout;


export default function SignIn() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Layout className={signStyle.layout}>
      <Content className={signStyle.login}>
        
        <Title level={1} >Course Management Assistant</Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item>
            <Radio.Group>
              <Radio.Button value="student">Student</Radio.Button>
              <Radio.Button value="teacher">Teacher</Radio.Button>
              <Radio.Button value="manager">Manager</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: '"email" is required' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Please input email"
              type="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '"password" is required' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Please input password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
    
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ display: "block", width: "100%", padding: "4px 15px" }}
              >
                Sign in
              </Button>
            
            
          </Form.Item>
          <Form.Item>
            No account?
            <Link href="/sign-in">
              <a> Sign up </a>
            </Link>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
