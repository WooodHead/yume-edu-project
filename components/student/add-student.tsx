import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { reqAddStudent, reqEditStudent } from "../../api";

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
  updated?: unknown;
  setUpdated?: unknown;
}

export default function AddEditStudent(props: EditStudentValue): JSX.Element {
  const { id, updated, setUpdated, name, email, country } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = async (values: EditStudentValue) => {
    const { name, email, country, type } = values;
    if (!id) {
      // add a student
      const response = await reqAddStudent({
        name,
        country,
        email,
        type,
      });
      setUpdated(!updated); //refresh数据源
      message.success("Add successful");
    } else {
      // edit an existing student
      const response = await reqEditStudent({ id, name, country, email, type });
      setUpdated(!updated);
      message.success("Edit successful");
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
        {!!id ? "Edit" : "Add Student"}
      </Button>
      <Modal
        style={{ minWidth: "520px" }}
        visible={visible}
        title={!!id ? "Edit Student" : "Add Student"}
        okText={!!id ? "Update" : "Add"}
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
            name: name,
            email: email,
            country: country,
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
