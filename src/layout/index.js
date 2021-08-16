import { useEffect, useState } from "react";
import AqiTable from "./../components/aqiTable";
import ComparisonChart from "./../components/comparisonChart";
import SelectCity from "./../components/selectCity";
import GuageChart from "./../components/guageChart";
import { fetch_aqi_data } from "./../redux/fetchAQI";
import { useDispatch, useSelector } from "react-redux";
// import "./App.css";
import { Typography } from "antd";
import { Offline, Online } from "react-detect-offline";
import OfflineView from "./../components/offlineView";
import { Row, Col } from "antd";
import { convert_data } from "../helpers/utils";

import "./layout.css";
const { Title } = Typography;

function Layout() {
  const { data } = useSelector((state) => state.fetch_aqi_data);

  const [city, setCity] = useState();
  const [colSize, setSizeCol] = useState(() => {
    return window.innerWidth < 780 ? 24 : 12;
  });
  let dispatch = useDispatch();
  const handleCityChange = (city) => {
    setCity(city);
  };
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    fetch_aqi_data(dispatch, data);
    // eslint-disable-next-line
  }, []);

  let chart_data = convert_data(data);

  let selected = chart_data.filter((el) => el.city === city);

  let cityData = !selected.length
    ? [{ value: 0 }]
    : [
        {
          value: selected[0].aqi,
        },
      ];

  const handleResize = (e) => {
    const windowSize = window.innerWidth;
    if (windowSize < 780) {
      setSizeCol(24);
    } else {
      setSizeCol(12);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Online>
        <Row className="selectCity">
          <SelectCity
            className="SelectCity"
            data={chart_data}
            handleCityChange={handleCityChange}
          />
        </Row>
        <Row>
          <Col span={colSize} className="chart">
            <Title level={2}>Comparison Chart</Title>
            <ComparisonChart data={data} />
          </Col>
          <Col span={colSize} className="chart">
            <Title level={2}>Real-Time AQI</Title>
            <GuageChart cityData={cityData} city={city} />
          </Col>
        </Row>
        <Row className="table">
          <Title level={2}>Real-Time AQI Table</Title>
          <AqiTable data={data} className="aqiTable" />
        </Row>
      </Online>
      <Offline>
        <OfflineView />
      </Offline>
    </div>
  );
}

export default Layout;
