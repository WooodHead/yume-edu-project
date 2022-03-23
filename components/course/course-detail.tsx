/* eslint-disable @next/next/no-img-element */
import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {
  getCourseCode,
  getCourseType,
  getTeacherList,
  postCourse,
} from "../../pages/api/api-service";
import Dragger from "antd/lib/upload/Dragger";
import moment from "moment";
import { durations } from "../../lib/model/config";
import { format, getTime } from "date-fns";
import { ICourse, IType } from "../../lib/model/course";

const UploadItem = styled(Form.Item)`
  .ant-col-8 {
    position: relative;
    padding-left: 3px;
    padding-right: 3px;
  }
  .ant-upload-drag-container {
    height: 260px;
  }
  .ant-upload-list-picture-card-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .ant-upload-list-item-image {
    width: 100%;
    height: 100%;
    object-fit: cover !important;
  }
`;

const { Option } = Select;

interface ITeacher {
  teacherId: number;
  name: string;
}

export default function AddCourseDetail(props: {
  current?: number;
  setCurrent?: React.Dispatch<React.SetStateAction<number>>;
  setScheduleId?: React.Dispatch<React.SetStateAction<number>>;
  setCourseId?: any;
  filledForm?: any;
  filledDetailsForm?: any;
  searchedForm?: any;
}) {
  const [form] = Form.useForm();
  const {
    current,
    setCurrent,
    setScheduleId,
    setCourseId,
    filledForm,
    filledDetailsForm,
    searchedForm
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState(""); // value of input
  const [teacherDetails, setTeacherDetails] = useState<ITeacher[]>([]); // teacherId & name
  const [durationUnit, setDurationUnit] = useState<number>(); // store current selected
  const [courseType, setCourseType] = useState<IType[]>([]);
  const [courseCode, setCourseCode] = useState(null);
  const [fileList, setFileList] = useState<any[]>([]); // cover


  console.log("get value from edit page:",filledDetailsForm)
  

  // Search Teacher
  useEffect(() => {
    setLoading(true);
    if (!!searchValue) {
      getTeacherList(searchValue).then((res) => {
        const { teachers } = res;

        // set and store teachers Id & name
        const teacherValue: ITeacher[] = [];
        teachers.map((obj: { id: any; name: any }) => {
          return teacherValue.push({ teacherId: obj.id, name: obj.name });
        });

        // form.setFieldsValue({teacherId: teachers.id})
        setTeacherDetails(teacherValue);

        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

   // Get course Code
  useEffect(() => {
    getCourseCode().then((res) => {
      if(!filledDetailsForm?.uid){
        form.setFieldsValue({ uid: res });
        setCourseCode(res);
      }    
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (value: any) => {
    const result: ICourse = {
      ...value,
      durationUnit: durationUnit,
      startTime: "2020-12-08",
      // startTime: value.startTime && format(value.startTime, 'yyy-MM-dd')
    };

    // goes to next page
    if (!!result) {
      postCourse(result)
        .then((res) => {
          setScheduleId(res.scheduleId);
          setCourseId(res.id);
          filledForm.setFieldsValue(res);

          console.log(
            "filledForm instance onfinish",
            filledForm.getFieldsValue(true)
          );
        })
        .finally(() => {
          if (current !== undefined && setCurrent !== undefined) {
            console.log(current);
            setCurrent(current + 1);
            message.success("success");
          }
          return current;
        });
    }
  };

  return (
    <div style={{ visibility: false ? "hidden" : "visible" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: filledDetailsForm?.name,
          teacherId: filledDetailsForm?.teacherName,
          type: filledDetailsForm?.type?.map((obj: { name: string }) => obj.name),
          uid: filledDetailsForm?.uid,
          // startTime: filledDetailsForm?.startTime, 
          price: filledDetailsForm?.price,
          maxStudents: filledDetailsForm?.maxStudents,
          duration: filledDetailsForm?.duration,
          detail: filledDetailsForm?.detail,
          cover: filledDetailsForm?.cover,
        }}  
      >
        <Row gutter={24} style={{ padding: "20px 0" }}>
          <Col span="8">
            <Form.Item
              label="Course Name"
              name="name"
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
              <Input placeholder="course name" />
            </Form.Item>
          </Col>
          <Col span="16">
            <Row gutter={24}>
              <Col span="8">
                <Form.Item
                  label="Teacher"
                  name="teacherId"
                  rules={[{ required: true, message: "teacher is required!" }]}
                >
                  <Select
                    showSearch
                    notFoundContent={loading ? <Spin size="small" /> : null}
                    filterOption={false}
                    placeholder="search teacher"
                    onSearch={(value) => setSearchValue(value)}
                  >
                    {teacherDetails?.map((obj: ITeacher) => {
                      return (
                        <Option key={obj.teacherId} value={obj.teacherId}>
                          {obj.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span="8">
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: "type is required!" }]}
                >
                  <Select
                    showSearch
                    mode="multiple"
                    allowClear
                    filterOption={false}
                    onSearch={()=>{ 
                      getCourseType().then((res) => {
                        setCourseType(res);
                      });
                    }}
                  >
                    {courseType?.map(({ id, name }) => {
                      return (
                        <Option key={id} value={id}>
                          {name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span="8">
                <Form.Item
                  label="Course Code"
                  name="uid"
                  rules={[
                    { required: true, message: "course code is required!" },
                  ]}
                >
                  <Input type="text" disabled={courseCode ? true : false} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={24} style={{ padding: "20px 0" }}>
          <Col span="8">
            <Form.Item label="Start Date" name="startTime">
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  const today = getTime(new Date());
                  const date = current.valueOf();

                  return date < today;
                }}
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "price is required!" }]}
            >
              <InputNumber
                prefix="$"
                min={0}
                type="text"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Student Limit"
              name="maxStudents"
              rules={[
                { required: true, message: "student limit is required!" },
              ]}
            >
              <InputNumber
                min={1}
                max={10}
                type="text"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[
                { required: true, message: "Duration must be greater than 0!" },
              ]}
            >
              <InputNumber
                addonAfter={
                  <Select
                    defaultValue="month"
                    onSelect={(el: SetStateAction<number | string>) =>
                      setDurationUnit(el as number)
                    }
                  >
                    {durations.map((el) => {
                      return (
                        <Option key={el.durationUnit} value={el.durationUnit}>
                          {el.duration}
                        </Option>
                      );
                    })}
                  </Select>
                }
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span="8">
            <Form.Item
              label="Description"
              name="detail"
              rules={[
                { required: true, message: "description is required!" },
                {
                  type: "string",
                  min: 10,
                  max: 100,
                  message:
                    "Description length must between 100 - 1000 characters",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Course description"
                style={{ minHeight: "292px" }}
              />
            </Form.Item>
          </Col>

          <Col span="8">
            <UploadItem label="Cover" name="cover">
              <ImgCrop rotate aspect={2 / 1.3}>
                <Dragger
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  // showUploadList={false}
                  maxCount={1}
                  onChange={({ file, fileList }) => {
                    console.log(file);
                    if (file?.response) {
                      const { url } = file.response;
                      return form.setFieldsValue({ cover: url });
                    } else {
                      return form.setFieldsValue({ cover: "" });
                    }
                    setFileList(fileList);
                  }}
                  style={{
                    minHeight: "292px",
                    backgroundColor: false ? "none" : "#F0F0F0",
                    border: "2px dashed #DCDCDC",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p
                    style={{ color: "	#808080", fontSize: "24px" }}
                    className="ant-upload-text"
                  >
                    Click or drag file to this area to upload
                  </p>
                </Dragger>
              </ImgCrop>
            </UploadItem>
          </Col>
        </Row>

        <Row gutter={24} style={{ padding: "20px 0" }}>
          <Col span="8">
            <Button type="primary" htmlType="submit">
              Create Course
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
