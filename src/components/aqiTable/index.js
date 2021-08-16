import React from "react";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { Table, Tag } from "antd";
import { convert_to_table_data, get_color } from "./../../helpers/utils";

const columns = [
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Current AQI",
    key: "aqi",
    dataIndex: "aqi",
    render: (aqi) => <Tag color={get_color(aqi)}>{aqi}</Tag>,
  },
  {
    title: "Last Updated",
    dataIndex: "last_updated",
    key: "last_updated",
  },
];

function AqiTable({ data }) {
  let { updated_at } = useSelector((state) => state.fetch_aqi_data);
  let table_data = convert_to_table_data(data, updated_at);
  return (
    <div style={{ width: "100%" }}>
      <Table columns={columns} dataSource={table_data} pagination={false} />
    </div>
  );
}

export default AqiTable;
