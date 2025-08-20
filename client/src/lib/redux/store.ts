import { configureStore } from '@reduxjs/toolkit';
import CrudReducer from "@/lib/redux/Features/Crud"; 
import GlobalReducer from "@/lib/redux/Features/Global"; 
export const store = configureStore({
  reducer: {
      crud: CrudReducer,
      global: GlobalReducer,
  },  
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
