import { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Spin } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { getCourseCode, getCourseType, getTeacherList } from "../../pages/api/api-service";

const { Option } = Select;

export default function AddCourseForm() {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState({}); // value of input
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [courseType, setCourseType] = useState([]);
  const [courseCode, setCourseCode] = useState()
  const [fileList, setFileList] = useState([]); // cover

  // Search Teacher
  useEffect(() => {
    setLoading(true);
    if (!!searchValue) {
      getTeacherList(searchValue).then((res) => {
        const { teachers } = res;
        setTeacherDetails(teachers);
        setLoading(false);
      });
    }
  }, [searchValue]);
  const onChange = (selectedTeacher: string) => {
    console.log("selected:", selectedTeacher);
  };

  // Get type
  useEffect(() => {
    getCourseType().then((res) => {
      setCourseType(res)
    });
  }, []);

  // Get course Code
  useEffect(() => {
    getCourseCode().then((res) => {
      setCourseCode(res)
    })
  },[])

  return (
    <>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col span="8">
            <Form.Item
              label="Course Name"
              name="courseName"
              rules={[
                {
                  required: true,
                  message: "name is required!",
                },
                {
                  type: "string",
                  min: 3,
                  max: 100,
                  message: "name must be between 3 and 100 characters",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span="16">
            <Row gutter={24}>
              <Col span="8">
                <Form.Item
                  label="Teacher"
                  name="teacher"
                  rules={[{ required: true, message: "teacher is required!" }]}
                >
                  <Select
                    showSearch
                    notFoundContent={loading ? <Spin size="small" /> : null}
                    filterOption={false}
                    placeholder="search teacher"
                    onSearch={(value) => setSearchValue(value)}
                    onChange={onChange}
                  >
                    {teacherDetails?.map(
                      (obj: { id: number; name: string }) => (
                        <Option key={obj.id} value={obj.name}>
                          {obj.name}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>

              <Col span="8">
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: "type is required!" }]}
                >
                  <Select showSearch filterOption={false} >
                    {
                      courseType.map((obj:{id: string, name: string})=>{
                        return  <Option key={obj.id} value={obj.name}>{obj.name}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>

              <Col span="8">
                <Form.Item
                  label="Course Code"
                  name="courseCode"
                  rules={[
                    { required: true, message: "course code is required!" },
                  ]}
                >
                  <Input disabled={courseCode? true: false} placeholder={courseCode} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span="8">
            <Form.Item label="Start Date" name="startDate">
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "price is required!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Student Limit"
              name="studentLimit"
              rules={[
                { required: true, message: "student limit is required!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: "duration is required!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span="8">
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "description is required!" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>

          <Col span="8">
            <ImgCrop rotate>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                // onChange={onChange}
                // onPreview={onPreview}
              >
                {fileList.length <= 1 &&
                  "Click or drag file to this area to upload"}
              </Upload>
            </ImgCrop>
          </Col>
        </Row>
      </Form>
    </>
  );
}
