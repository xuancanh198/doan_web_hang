import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import {LANG_DEFAULT} from "@/constants/Global";

interface ExampleState {
  lang: String;
  routerRedirectTo : String
}

const initialState: ExampleState = {
  lang: Cookies.get("lang") ?? LANG_DEFAULT,
  routerRedirectTo  : "",
};

export const exampleSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
     setLang(state, action) {
        state.lang = action.payload
    },
     setRouterRedirectTo(state, action) {
        state.routerRedirectTo = action.payload
    },
  },
});

export const {setLang, setRouterRedirectTo } = exampleSlice.actions;
export default exampleSlice.reducer;
