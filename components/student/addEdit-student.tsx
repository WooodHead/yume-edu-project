import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { postStudents, putStudents } from "../../pages/api/api-service";
import { EditStudentValue } from "../../lib/model/student";


// layout
const formItemLayout = {
  labelCol: { span: 6 },
};
const formInputLayout = {
  style: { width: "80%" },
};

interface EditStudentValueProps { 
  id?: number;
  name: string;
  email: string;
  country: string;
  updated: boolean;
  setUpdated: (value: boolean) => boolean
}

export default function AddEditStudent(props:EditStudentValueProps): JSX.Element {
  const { id, name, email, country, updated, setUpdated } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (values: EditStudentValue) => {
    console.log("values:",values)
    if (!id) {
      // Add a student
      postStudents(values).then((res) => {
        setUpdated(!updated);
        message.success("Add successful");
      });
    } else {
      // Edit a student
      putStudents({id, ...values}).then((res) => {
        setUpdated(!updated);
      message.success("Edit successful");
    })
    }
    setVisible(false);
  };

  return (
    <div>
      <Button
        type={!!id? "link" : "primary"}
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
