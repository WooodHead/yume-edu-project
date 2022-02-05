import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import signStyle from "../styles/sign.module.css";
import axios from "axios";
import { AES } from "crypto-js";
import { Layout, Input, Button, Checkbox, Form, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Typography } from "antd";

// import styled from "styled-components"

const { Title } = Typography;
const { Content } = Layout;

interface LoginFormValues { 
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'manager'
}

export default function SignIn() {
  const router = useRouter()
  const onFinish = (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
    //

    const base = "http://cms.chtoma.com/api";
    const { password, ...rest } = values;

    axios
      .post(`${base}/login`, {
        ...rest,
        password: AES.encrypt(password, "cms").toString(),
      })
      .then((res) => {
        // console.log(res);
        const userInfo = res.data.data;
        if(userInfo){
          localStorage.setItem('cms', JSON.stringify(userInfo));
          router.push(`dashboard/${values.role}`)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout className={signStyle.layout}>
      <Content className={signStyle.login}>
        <Title level={1}>Course Management Assistant</Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true, role: "student" }}
          onFinish={onFinish}
        >
          <Form.Item rules={[{ required: true }]} name="role">
            <Radio.Group>
              <Radio.Button value="student">Student</Radio.Button>
              <Radio.Button value="teacher">Teacher</Radio.Button>
              <Radio.Button value="manager">Manager</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '"email" is required' },
              { type: "email" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Please input email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '"password" is required' },
              { min: 4, max: 16 },
            ]}
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
        </Form>

        <div>
          No account?
          <Link href="/sign-in">
            <a> Sign up </a>
          </Link>
        </div>
      </Content>
    </Layout>
  );
}
