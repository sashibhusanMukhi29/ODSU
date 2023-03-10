import { createSlice } from "@reduxjs/toolkit";


const initialState = {

  title:'',
 
  //api:"http://192.168.3.156:8888/"
  api:"http://localhost:3002/rrfData/"
};

const Resource = createSlice({
  name: "resource",

  initialState,

  reducers: {
   
    titles:(state,action)=>{
      state.title=action.payload
    },
   
    api:(state,action)=>{
      state.api=action.payload
    }
  },
});

export const { resourcepost, rrf, tagPost,titles,SchdIntData,api} = Resource.actions;


export default Resource.reducer;


