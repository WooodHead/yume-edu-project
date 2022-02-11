import React from "react";
import "antd/dist/antd.css";
import OverviewContent from "../../components/content";
import ManagerLayout from "../../components/manager/manager-layout";

export default function ManagerHomePage() {
  return (
    <ManagerLayout>
      <OverviewContent />
    </ManagerLayout>
  );
}
