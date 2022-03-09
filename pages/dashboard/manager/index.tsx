import React from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../components/student/manager-layout";
import { Card, Col, Row } from "antd";

export default function ManagerHomePage() {
  return (
    <ManagerLayout>
      <Row gutter={16} style={{ margin: "30px 0" }}>
      
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
         
       
        
      </Row>
    </ManagerLayout>
  );
}
