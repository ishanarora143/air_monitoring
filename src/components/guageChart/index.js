import { useEffect, useRef, useState } from "react";
import { Chart, registerShape } from "@antv/g2";
import { create_chart_annotation, get_color } from "../../helpers/utils";

function GuageChart({ cityData, city }) {
  const [aqi_chart, setAqiChart] = useState();
  const elementRef = useRef();
  let City = city || "";

  useEffect(() => {
    registerShape("point", "pointer", {
      draw(cfg, container) {
        const group = container.addGroup({});
        const center = this.parsePoint({ x: 0, y: 0 });
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
        return get_color(val);
      });

    setAqiChart(chart);
    draw([{ value: 0 }]);

    function draw(data) {
      chart.annotation().clear(true);

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
    let arc_data = create_chart_annotation(val);
    aqi_chart.annotation().arc(arc_data);

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
    <div>
      <div ref={elementRef}></div>
    </div>
  );
}

export default GuageChart;
