import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import {LANG_DEFAULT} from "@/constants/Global";

interface ExampleState {
  lang: String;
}

const initialState: ExampleState = {
  lang: Cookies.get("lang") ?? LANG_DEFAULT,
};

export const exampleSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
     setLang(state, action) {
        state.lang = action.payload
    },
    
  },
});

export const {setLang } = exampleSlice.actions;
export default exampleSlice.reducer;
