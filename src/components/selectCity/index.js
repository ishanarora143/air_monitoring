import { Select } from "antd";
const { Option } = Select;

function SelectCity({ data, handleCityChange }) {
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a City"
      optionFilterProp="children"
      onChange={handleCityChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {data.map(({ city }) => (
        <Option key={city} value={city}>
          {city}
        </Option>
      ))}
    </Select>
  );
}

export default SelectCity;
