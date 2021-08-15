import { useEffect, useState } from "react";
import AqiTable from "./components/aqiTable";
import ComparisonChart from "./components/comparisonChart";
import SelectCity from "./components/selectCity";
import GuageChart from "./components/guageChart";
import { fetch_aqi_data } from "./redux/fetchAQI";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Typography } from "antd";
import { Offline, Online } from "react-detect-offline";
import OfflineView from "./components/offlineView";

const { Title } = Typography;

function App() {
  const { data } = useSelector((state) => state.fetch_aqi_data);

  const [city, setCity] = useState();
  let dispatch = useDispatch();
  const handleCityChange = (city) => {
    setCity(city);
    //console.log("selected city", city);
  };
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    fetch_aqi_data(dispatch, data);
    // eslint-disable-next-line
  }, []);
  let chart_data = Object.keys(data).map((el) => {
    let obj = {};
    obj.city = el || "";
    obj.updated_at = data[el].updated_at;
    obj.aqi = data[el]["aqi"][data[el]["aqi"].length - 1] || 0;
    return obj;
  });
  let cityData;
  let selected = chart_data.filter((el) => el.city === city);
  if (!selected.length) {
    cityData = [{ value: 0 }];
  } else {
    cityData = [
      {
        value: selected[0].aqi,
      },
    ];
    //console.log("cityData kkkk", cityData);
  }

  return (
    <div className="App">
      <Online>
        <SelectCity
          className="SelectCity"
          data={chart_data}
          handleCityChange={handleCityChange}
        />
        <Title level={2}>Real Time AQI of {city}</Title>

        <GuageChart cityData={cityData} city={city} />
        <Title level={2}>Comparision Chart of different Cities</Title>

        <ComparisonChart data={data} />
        <Title level={2}>AQI Table of different cities</Title>

        <AqiTable data={data} />
      </Online>
      <Offline>
        <OfflineView />
      </Offline>
    </div>
  );
}

export default App;
