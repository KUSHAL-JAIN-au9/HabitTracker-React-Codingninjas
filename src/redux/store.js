import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import habitReducer from "./habits";

//configuring the store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    habits: habitReducer,
  },
});

console.log(store.getState());
