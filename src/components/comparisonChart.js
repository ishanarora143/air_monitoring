import { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Chart } from "@antv/g2";

const client = new W3CWebSocket("ws://city-ws.herokuapp.com");

function ComparisonChart() {
  const [data, setData] = useState({});
  const [aqi_chart, setAqiChart] = useState();
  const elementRef = useRef();

  useEffect(() => {
    const chart = new Chart({
      container: elementRef.current,
      autoFit: true,
      height: 500,
    });

    chart.data([]);
    chart.tooltip({
      showMarkers: true,
    });

    chart
      .interval()
      .position("city*aqi")
      .color("aqi")
      .animate({
        appear: {
          animation: "delayScaleInY",
          easing: "easeElasticOut",
          delay(index) {
            return index * 10;
          },
        },
      })
      .style("aqi", (aqi) => {
        if (aqi < 50) {
          return {
            fill: "#55A84F",
          };
        }
        if (aqi < 100) {
          return {
            fill: "#A2C853",
          };
        }
        if (aqi < 200) {
          return {
            fill: "#FFF832",
          };
        }
        if (aqi < 300) {
          return {
            fill: "#F29C32",
          };
        }
        if (aqi < 400) {
          return {
            fill: "#E93E33",
          };
        }
        if (aqi < 500) {
          return {
            fill: "#AF2D24",
          };
        }

        return {
          fillOpacity: 1,
          lineWidth: 0,
          stroke: "#FF0000",
          lineDash: [3, 2],
          color: "#FF0000",
          fill: "#FF00FF",
        };
      });

    chart.interaction("element-highlight");
    chart.interaction("legend-highlight");
    chart.interaction("axis-label-highlight");

    setAqiChart(chart);
    chart.render();
  }, []);

  useEffect(() => {
    let chart_data = Object.keys(data).map((el) => {
      let obj = {};
      obj.city = el || "";
      obj.updated_at = data[el].updated_at;
      obj.aqi = data[el]["aqi"][data[el]["aqi"].length - 1] || 0;
      return obj;
    });

    console.log(chart_data);
    if (aqi_chart && chart_data) {
      aqi_chart.data(chart_data);
      aqi_chart.render();
    }
  }, [aqi_chart, data]);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      let socket_data = JSON.parse(message.data);
      let new_data = { ...data };
      let date = Date.now();
      socket_data.forEach((element) => {
        if (new_data[element.city]) {
          new_data[element.city]["aqi"].push(
            parseFloat(element.aqi.toFixed(2))
          );
          new_data[element.city]["updated_at"] = date;
        } else {
          new_data[element.city] = {
            aqi: [parseFloat(element.aqi.toFixed(2))],
            updated_at: date,
          };
        }
      });
      setData({ ...new_data });
    };
  }, [data]);
  return <div ref={elementRef}></div>;
}

export default ComparisonChart;
