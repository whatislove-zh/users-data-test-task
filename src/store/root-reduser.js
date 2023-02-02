import { combineReducers } from "redux";
import { expandReduser } from "./expanded/expanded-reduser";

export const rootReduser= combineReducers({
    expanded: expandReduser,
})