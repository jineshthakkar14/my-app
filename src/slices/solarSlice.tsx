import { createSlice } from "@reduxjs/toolkit";


export interface NavDrawerInitialState {
    loading: boolean;
    solarEnergy:number,
    buildingEnergy:number
  }
  
  const initialState: NavDrawerInitialState = {
    loading: false,
    solarEnergy: 10,
    buildingEnergy: 10,
  };


const solarSlice = createSlice({
  name: "solar",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    
    setSolarEnergy(state, value) {
      state.solarEnergy = value.payload;
    },
    setBuildingEnergy(state, value) {
        state.buildingEnergy = value.payload;
    },
  },
});

export const {setLoading, setSolarEnergy ,setBuildingEnergy } = solarSlice.actions;

export default solarSlice.reducer;