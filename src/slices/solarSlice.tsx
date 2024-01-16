import { createSlice } from "@reduxjs/toolkit";


export interface NavDrawerInitialState {
    loading: boolean;
    posX:number,
    posY:number
  }
  
  const initialState: NavDrawerInitialState = {
    loading: false,
    posX: localStorage.getItem("posX") ? JSON.parse(localStorage.getItem("posX")) : 100,
    posY: localStorage.getItem("posY") ? JSON.parse(localStorage.getItem("posY")) : 200,
  };


const solarSlice = createSlice({
  name: "solar",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    
    setPosX(state, value) {
      state.posX = value.payload;
    },
    setPosY(state, value) {
        state.posY = value.payload;
    },
  },
});

export const {setLoading, setPosX ,setPosY } = solarSlice.actions;

export default solarSlice.reducer;