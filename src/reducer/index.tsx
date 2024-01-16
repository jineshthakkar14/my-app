import { combineReducers } from "@reduxjs/toolkit"
import solarSlice from "../slices/solarSlice"

const rootReducer  = combineReducers({
   solar:solarSlice
})

export default rootReducer