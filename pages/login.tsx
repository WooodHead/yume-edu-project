import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import signStyle from "../styles/sign.module.css";
import { AES } from "crypto-js";
import { Layout, Input, Button, Checkbox, Form, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Typography } from "antd";
import { saveUser } from "../lib/utils/storageUtils";
import { postLogin } from "../pages/api/api-service";
import { LoginFormValues } from "../lib/model/login";

const { Title } = Typography;
const { Content } = Layout;

export default function SignIn() {
  const router = useRouter();
  // LogIn
  const onFinish = async (values: LoginFormValues) => {
    let { password, email, role } = values;
    password = AES.encrypt(password, "cms").toString();
    postLogin({ password, email, role }).then((res) => {
      const user = res;
      if (user) {
        saveUser(user);
        router.push(`dashboard/${values.role}`);
      }
    });
  };

  return (
    <>
      <Head>
        <title>YumEdu Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}
