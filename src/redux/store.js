import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import habitReducer from "./habits";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    habits: habitReducer,
  },
});

console.log(store.getState());
