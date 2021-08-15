import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

function OfflineView() {
  return (
    <div>
      <Title>You are offline</Title>
      <Title>
        Please connect to a network and refresh the page to get react-time data
      </Title>
    </div>
  );
}

export default OfflineView;
