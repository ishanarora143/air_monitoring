import { START_SOCKET_CONNECTION, ON_DATA } from "./actionTypes";

export const start_soket_connection = () => ({
  type: START_SOCKET_CONNECTION,
});
export const on_data = (payload) => ({
  type: ON_DATA,
  payload,
});
