import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import axios from "axios";

// interface Values {
//   title: string;
//   description: string;
//   modifier: string;
// }

// interface CollectionCreateFormProps {
//   visible: boolean;
//   onCreate: (values: Values) => void;
//   onCancel: () => void;
// }

// ****** country的初始值设置 ******** ？？
export default function AddEditStudent(props: { name; email; country; id }) {
  // layout
  const formItemLayout = {
    labelCol: { span: 6 },
  };
  const formInputLayout = {
    style: { width: "80%" },
  };

  // const {name} = props.name
  const { Option } = Select;
  const [form] = Form.useForm();
  //
  const [visible, setVisible] = useState(false);
  const [updated, setUpdated] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);

    const base = "http://cms.chtoma.com/api";
    const userToken = JSON.parse(localStorage.getItem("cms") as string).token;
    const { name, country, email, type } = values;

    if (props.id === undefined) {
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
    } else {
      axios
        .put(
          `${base}/students/`,
          {
            id: props.id,
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
        // onCancel={onCancel}
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
          }}
          onFinish={onCreate}
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
