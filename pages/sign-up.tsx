import React from 'react';
import Link from 'next/link'
import signStyle from '../styles/sign.module.css'

import { Layout, Input, Button, Form, Radio } from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';


const { Title } = Typography;
export default function SignUp() {

    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    
    return (
        <Layout className={signStyle.layout} style={{display:"grid", placeItems: "center"}}> 
            <Form className={signStyle.logout} form={form} name="register" onFinish={onFinish} scrollToFirstError>

                <Title className="title" level={1} >Sign up your account</Title> 
                <Form.Item
                    name="radio-group"
                    rules={[{ required: true, message: '"role" is required' }]}
                    
                >
                    <p className={signStyle.xrequired}>Role</p>
                    <Radio.Group>
                        <Radio value="student">Student</Radio>
                        <Radio value="teacher">Teacher</Radio>
                        <Radio value="manager">Manager</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                >
                    <p className={signStyle.xrequired}>Email</p>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <p className={signStyle.xrequired}>Password</p>
                    <Input.Password  />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <p className={signStyle.xrequired}>Confirm Password</p>
                    <Input.Password style={{width:'350px'}} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"350px"}}>
                    Sign up
                    </Button> 
                </Form.Item>

                <Form.Item>
                    Already have an account?  
                    <Link href="/sign-in">
                        <a> Sign in </a>
                    </Link>
                </Form.Item>
            </Form>
        </Layout>
    )
}
