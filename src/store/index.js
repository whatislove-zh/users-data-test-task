import { createStore, compose } from "redux";


import { rootReduser } from "./root-reduser"


const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReduser, composeEnhansers());

export { store };
