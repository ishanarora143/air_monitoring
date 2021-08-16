import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { color } from "../constants";
TimeAgo.addDefaultLocale(en);

export const convert_data = (data) => {
  let chart_data = Object.keys(data).map((el) => {
    let obj = {};
    obj.city = el || "";
    obj.updated_at = data[el].updated_at;
    obj.aqi = data[el]["aqi"][data[el]["aqi"].length - 1] || 0;
    return obj;
  });

  return chart_data;
};

export const convert_to_table_data = (data, updated_at) => {
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
  return table_data;
};

export const get_color = (val) => {
  if (val <= 50) {
    return color.good;
  } else if (val > 50 && val <= 100) {
    return color.satisfactory;
  } else if (val > 100 && val <= 200) {
    return color.moderate;
  } else if (val > 200 && val <= 300) {
    return color.poor;
  } else if (val > 300 && val <= 400) {
    return color.very_poor;
  } else if (val > 400 && val <= 500) {
    return color.severe;
  }
};

export const create_chart_annotation = (val) => {
  return {
    start: [0, 1],
    end: [val, 1],
    style: {
      stroke: get_color(val),
      lineWidth: 25,
      lineDash: null,
    },
  };
};
