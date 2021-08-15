import React from "react";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { Table, Tag } from "antd";
import { color } from "./../constants";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

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
    render: (aqi) => (
      <>
        {aqi < 50 ? (
          <Tag color={color.good}>{aqi}</Tag>
        ) : aqi < 100 ? (
          <Tag color={color.satisfactory}>{aqi}</Tag>
        ) : aqi < 200 ? (
          <Tag color={color.moderate}>{aqi}</Tag>
        ) : aqi < 300 ? (
          <Tag color={color.poor}>{aqi}</Tag>
        ) : aqi < 400 ? (
          <Tag color={color.very_poor}>{aqi}</Tag>
        ) : aqi < 500 ? (
          <Tag color={color.severe}>{aqi}</Tag>
        ) : (
          ""
        )}
      </>
    ),
  },
  {
    title: "Last Updated",
    dataIndex: "last_updated",
    key: "last_updated",
  },
];

function AqiTable({ data }) {
  let { updated_at } = useSelector((state) => state.fetch_aqi_data);
  const timeAgo = new TimeAgo("en-US");

  let table_data = Object.keys(data).map((el) => {
    let obj = {};
    // obj.key = data[el].city;
    obj.city = el || "";
    obj.updated_at = data[el].updated_at;

    obj.aqi = data[el]["aqi"][data[el]["aqi"].length - 1] || 0;

    if (obj.updated_at === updated_at) {
      obj.last_updated = "Just now";
    } else {
      obj.last_updated =
        timeAgo.format(new Date(obj.updated_at), "mini-now") + " ago";
    }
    return obj;
  });

  return (
    <div>
      <Table columns={columns} dataSource={table_data} pagination={false} />
    </div>
  );
}

export default AqiTable;
