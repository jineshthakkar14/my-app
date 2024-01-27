import { createSlice } from "@reduxjs/toolkit";


export interface NavDrawerInitialState {
    model: any;
    solarEnergy:number,
    buildingEnergy:number
  }
  
  const initialState: NavDrawerInitialState = {
    model: false,
    solarEnergy: 10,
    buildingEnergy: 10,
  };


const solarSlice = createSlice({
  name: "solar",
  initialState: initialState,
  reducers: {
    setModel(state, value) {
      state.model = value.payload;
    },
    
    setSolarEnergy(state, value) {
      state.solarEnergy = value.payload;
    },
    setBuildingEnergy(state, value) {
        state.buildingEnergy = value.payload;
    },
  },
});

export const {setModel, setSolarEnergy ,setBuildingEnergy } = solarSlice.actions;

export default solarSlice.reducer;