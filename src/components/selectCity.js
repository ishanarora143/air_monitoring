import { Select } from "antd";
const { Option } = Select;

function SelectCity({ data, handleCityChange }) {
  function onBlur() {
    //console.log("blur");
  }

  function onFocus() {
    //console.log("focus");
  }

  function onSearch(val) {
    //console.log("search:", val);
  }
  return (
    <Select
      showSearch
      style={{ width: 200, alignSelf: "center", marginTop: 100 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={handleCityChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {data.map((el) => (
        <Option key={el.city} value={el.city}>
          {el.city}
        </Option>
      ))}
    </Select>
  );
}

export default SelectCity;
