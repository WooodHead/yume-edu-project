import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";

// layout
const formItemLayout = {
  labelCol: { span: 6 },
};
const formInputLayout = {
  style: { width: "80%" },
};

interface EditStudentValue {
  name?: string;
  email?: string;
  country?: string;
  id?: number;
  type?: number;
}

export default function AddEditStudent(props: {
  id?: number;
  updated?: boolean;
  setUpdated?: any;
  record?: EditStudentValue;
}) {
  // const {name} = props.name
  const { Option } = Select;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (values: EditStudentValue) => {
    // console.log("Received values of form: ", values);
    const base = "http://cms.chtoma.com/api";
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    const { name, country, email, type } = values;

    if (!props.id) {
      // add a new student
      axios
        .post(
          `${base}/students`,
          {
            name,
            country,
            email,
            type,
          },
          { headers: { Authorization: `Bearer ${userToken}` } }
        )
        .then((res) => {
          console.log(res);
          props.setUpdated(!props.updated); //refresh数据源
          message.success('Add successful');
        })
        .catch((err) => {
          console.log(err);
          message.error('Addition Failed');
        });
    } else {
      // edit an existing student
      axios
        .put(
          `${base}/students/`,
          {
            id: props.id,
            name,
            country,
            email,
            type,
          },
          { headers: { Authorization: `Bearer ${userToken}` } }
        )
        .then((res) => {
          console.log(res);
          props.setUpdated(!props.updated); //refresh数据源
          message.success('Edit successful');
        })
        .catch((err) => {
          console.log(err);
          message.error('Edition Failed');
        });
    }
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        {!!props.id ? "Edit" : "Add Student"}
      </Button>
      <Modal
        style={{ minWidth: "520px" }}
        visible={visible}
        title={!!props.id ? "Edit Student" : "Add Student"}
        okText={!!props.id ? "Update" : "Add"}
        cancelText="Cancel"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onFinish(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
            name: props.name,
            email: props.email,
            country: props.country,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            {...formItemLayout}
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input {...formInputLayout} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
                type: "email",
              },
            ]}
          >
            <Input {...formInputLayout} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="country"
            label="Area"
            rules={[{ required: true }]}
          >
            <Select
              {...formInputLayout}
              placeholder="Select a option and change input text above"
            >
              <Option value="China">China</Option>
              <Option value="New Zealand">New Zealand</Option>
              <Option value="Canada">Canada</Option>
              <Option value="Australia">Australia</Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="type"
            label="Student Type"
            rules={[{ required: true }]}
          >
            <Select
              {...formInputLayout}
              placeholder="Select a option and change input text above"
            >
              <Option value="2">developer</Option>
              <Option value="1">tester</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
