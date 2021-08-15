import { createStore } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

import rootReducer from "./rootReducer";

export default createStore(rootReducer);
