import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import axios from "axios";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const formItemLayout = {
    labelCol: { span: 6 },
  };
  const formInputLayout = {
    style: { width: "80%" },
  };

  const { Option } = Select;
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ minWidth: "520px" }}
      visible={visible}
      title="Add Student"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="form_in_modal"
        initialValues={{ modifier: "public"}}
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
            <Option value="china">China</Option>
            <Option value="nzl">New Zealand</Option>
            <Option value="canada">Canada</Option>
            <Option value="australia">Australia</Option>
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
  );
};

export default function AddStudent() {
  const [visible, setVisible] = useState(false);
  const [updated, setUpdated] = useState(false);
  
 

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);

    const base = "http://cms.chtoma.com/api";
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    const { name, country, email, type } = values;

    axios
      .post(
        `${base}/students`,
        {
          name: name,
          country: country,
          email: email,
          type: type,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        console.log(res);
        setUpdated(!updated);
      })
      .catch((err) => {
        console.log(err);
      });

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
        Edit Student
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}

      />
      
    </div>
  );
}
