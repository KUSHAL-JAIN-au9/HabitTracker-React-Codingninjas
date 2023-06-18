import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: [],
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.habits.push(action.payload);
    },
    removeHabit: (state, action) => {
      const filterdstate = state.habits.filter((item) => {
        console.log(item.id, action.payload);
        return item.id !== action.payload;
      });
      console.log(filterdstate, action.payload, state.habits.length);
      //   return (state.habits = [...filterdstate]);
    },
    editHabit: (state, action) => {
      //   const filterdstate = state.filter((item) => item.id != action.payload.id);
      //   state.habits = [filterdstate, action.payload];
      //   const indexOfState = state.habits.indexOf(action.payload);
      //   const indexOfState = state.habits.findIndex((x) => {
      //     return x.id == action.payload.id;
      //   });

      const indexOfState = state.habits
        .map((x) => x.id)
        .indexOf(action.payload.id);

      console.log(indexOfState, state.habits, action.payload);
      console.log("edited state", state.habits[`${indexOfState}`]);
      if (indexOfState != -1) state.habits[`${indexOfState}`] = action.payload;
      return;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addHabit, removeHabit, editHabit } = habitSlice.actions;

export default habitSlice.reducer;
