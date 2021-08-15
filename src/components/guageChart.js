import { useEffect, useRef, useState } from "react";
import { Chart, registerShape } from "@antv/g2";
import { color } from "./../constants";

function GuageChart({ cityData, city }) {
  const [aqi_chart, setAqiChart] = useState();
  const elementRef = useRef();
  let City = city || "";

  useEffect(() => {
    // 自定义Shape 部分
    registerShape("point", "pointer", {
      draw(cfg, container) {
        const group = container.addGroup({});
        // 获取极坐标系下画布中心点
        const center = this.parsePoint({ x: 0, y: 0 });
        // 绘制指针
        group.addShape("line", {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: cfg.x,
            y2: cfg.y,
            stroke: cfg.color,
            lineWidth: 5,
            lineCap: "round",
          },
        });
        group.addShape("circle", {
          attrs: {
            x: center.x,
            y: center.y,
            r: 9.75,
            stroke: cfg.color,
            lineWidth: 4.5,
            fill: "#fff",
          },
        });
        return group;
      },
    });

    // const color = ["#0086FA", "#FFBF00", "#F5222D"];
    const chart = new Chart({
      container: elementRef.current,
      autoFit: true,
      height: 500,
      padding: [0, 0, 0, 0],
    });
    chart.data([{ value: 0 }]);
    chart.animate(false);

    chart.coordinate("polar", {
      startAngle: (-9 / 8) * Math.PI,
      endAngle: (1 / 8) * Math.PI,
      radius: 0.75,
    });
    chart.scale("value", {
      min: 0,
      max: 500,
      tickInterval: 50,
    });

    chart.axis("1", false);
    chart.axis("value", {
      line: null,
      label: {
        offset: -40,
        style: {
          fontSize: 18,
          fill: "#CBCBCB",
          textAlign: "center",
          textBaseline: "middle",
        },
      },
      tickLine: {
        length: -24,
      },
      grid: null,
    });
    chart.legend(false);
    chart.tooltip(false);
    chart
      .point()
      .position("value*1")
      .shape("pointer")
      .color("value", (val) => {
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
      });
    setAqiChart(chart);
    draw([{ value: 0 }]);

    function draw(data) {
      chart.annotation().clear(true);
      // 绘制仪表盘背景
      //   chart.annotation().arc({
      //     top: false,
      //     start: [0, 0],
      //     end: [0, 1],
      //     style: {
      //       stroke: "#CBCBCB",
      //       lineWidth,
      //       lineDash: null,
      //     },
      //   });

      // 绘制指标数字
      chart.annotation().text({
        position: ["50%", "85%"],
        content: "AQI",
        style: {
          fontSize: 20,
          fill: "#545454",
          textAlign: "center",
        },
      });
      chart.annotation().text({
        position: ["50%", "90%"],
        content: `${data[0].value} `,
        style: {
          fontSize: 36,
          fill: "#545454",
          textAlign: "center",
        },
        offsetY: 15,
      });
      chart.changeData(data);
    }
  }, []);

  if (aqi_chart && cityData) {
    draw(cityData);
  }

  function draw(data) {
    const val = data[0].value;
    const lineWidth = 25;
    aqi_chart.annotation().clear(true);
    // 绘制仪表盘背景
    aqi_chart.annotation().arc({
      top: false,
      start: [0, 0],
      end: [val, 1],
      style: {
        stroke: "#CBCBCB",
        lineWidth,
        lineDash: null,
      },
    });

    if (val <= 50) {
      aqi_chart.annotation().arc({
        start: [0, 1],
        end: [val, 1],
        style: {
          stroke: color.good,
          lineWidth,
          lineDash: null,
        },
      });
    }

    if (val >= 50 && val <= 100) {
      aqi_chart.annotation().arc({
        start: [0, 1],
        end: [val, 1],
        style: {
          stroke: color.satisfactory,
          lineWidth,
          lineDash: null,
        },
      });
    }
    if (val >= 100 && val <= 200) {
      aqi_chart.annotation().arc({
        start: [0, 1],
        end: [val, 1],
        style: {
          stroke: color.moderate,
          lineWidth,
          lineDash: null,
        },
      });
    }
    if (val >= 200 && val <= 300) {
      aqi_chart.annotation().arc({
        start: [0, 1],
        end: [val, 1],
        style: {
          stroke: color.poor,
          lineWidth,
          lineDash: null,
        },
      });
    }
    if (val >= 300 && val <= 400) {
      aqi_chart.annotation().arc({
        start: [0, 1],
        end: [val, 1],
        style: {
          stroke: color.very_poor,
          lineWidth,
          lineDash: null,
        },
      });
    }
    if (val >= 400 && val <= 500) {
      aqi_chart.annotation().arc({
        start: [0, 1],
        end: [val, 1],
        style: {
          stroke: color.severe,
          lineWidth,
          lineDash: null,
        },
      });
    }

    // 绘制指标数字
    aqi_chart.annotation().text({
      position: ["50%", "85%"],
      content: "AQI of " + City,
      style: {
        fontSize: 20,
        fill: "#545454",
        textAlign: "center",
      },
    });
    aqi_chart.annotation().text({
      position: ["50%", "90%"],
      content: `${data[0].value} `,
      style: {
        fontSize: 36,
        fill: "#545454",
        textAlign: "center",
      },
      offsetY: 15,
    });
    aqi_chart.changeData(data);
  }
  return (
    <div style={{ marginBottom: 50 }}>
      {!city ? <h3>Please select a city</h3> : ""}
      <div ref={elementRef}></div>
    </div>
  );
}

export default GuageChart;
