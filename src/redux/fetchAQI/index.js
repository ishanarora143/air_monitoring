import { START_SOCKET_CONNECTION, ON_DATA } from "./actionTypes";
// import config from "../../config.js";
import { start_soket_connection, on_data } from "./actions";
import { w3cwebsocket as W3CWebSocket } from "websocket";

// const API_BASE_URL = config.API_BASE_URL;

const initialState = {
  connection_status: false,
  data: [],
  updated_at: null,
};

export const fetch_aqi_data = (dispatch) => {
  const client = new W3CWebSocket("ws://city-ws.herokuapp.com");
  client.onopen = () => {
    //console.log("WebSocket Client Connected");
    dispatch(start_soket_connection());
  };
  client.onmessage = (message) => {
    let socket_data = JSON.parse(message.data);
    dispatch(on_data(socket_data));
  };
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case START_SOCKET_CONNECTION: {
      return {
        ...state,
        connection_status: true,
      };
    }
    case ON_DATA: {
      const { payload } = action;
      let new_data = { ...state.data };
      let date = Date.now();
      payload.forEach((element) => {
        if (new_data[element.city]) {
          new_data[element.city] = {
            aqi: [
              ...new_data[element.city]["aqi"],
              parseFloat(element.aqi.toFixed(2)),
            ],
            updated_at: date,
          };
        } else {
          new_data[element.city] = {
            aqi: [parseFloat(element.aqi.toFixed(2))],
            updated_at: date,
          };
        }
      });

      return {
        ...state,
        data: new_data,
        updated_at: date,
      };
    }

    default:
      return state;
  }
}
