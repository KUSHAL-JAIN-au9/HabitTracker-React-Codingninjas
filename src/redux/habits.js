import { createSlice } from "@reduxjs/toolkit";
import { addDays, getDate } from "../utils/getDate";

//static week date for sample habit
const weekLog = [
  {
    id: 1,
    date: addDays(getDate().today, 0).dateString,
    week: addDays(getDate().today, 0).weekday,
    status: "none",
  },
  {
    id: 2,
    date: addDays(getDate().today, -1).dateString,
    week: addDays(getDate().today, -1).weekday,
    status: "none",
  },
  {
    id: 3,
    date: addDays(getDate().today, -2).dateString,
    week: addDays(getDate().today, -2).weekday,
    status: "none",
  },
  {
    id: 4,
    date: addDays(getDate().today, -3).dateString,
    week: addDays(getDate().today, -3).weekday,
    status: "none",
  },
  {
    id: 5,
    date: addDays(getDate().today, -4).dateString,
    week: addDays(getDate().today, -4).weekday,
    status: "none",
  },
  {
    id: 6,
    date: addDays(getDate().today, -5).dateString,
    week: addDays(getDate().today, -5).weekday,
    status: "none",
  },
  {
    id: 7,
    date: addDays(getDate().today, -6).dateString,
    week: addDays(getDate().today, -6).weekday,
    status: "none",
  },
];
const initialState = {
  refresh: false,
  habits: [{ id: 1, name: "sample habit", week: weekLog }],
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    refreshHabit: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.refresh = !state.refresh;
    },
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    removeHabit: (state, action) => {
      // const filterdstate = state.habits.filter((item) => {
      //   console.log(item.id, action.payload);
      //   return item.id !== action.payload;
      // });
      state.habits.splice(
        state.habits.findIndex((arrow) => arrow?.id === action.payload),
        1
      );
      // console.log(filterdstate, action.payload, state.habits.length);
      // return state.habits;
    },
    editHabit: (state, action) => {
      //   const filterdstate = state.filter((item) => item.id != action.payload.id);
      //   state.habits = [filterdstate, action.payload];
      //   const indexOfState = state.habits.indexOf(action.payload);

      // if (state.habits.length < 1) {
      //   state.habits.week.push(action.payload);
      // }
      const HabitindexOfState = state.habits.findIndex((x) => {
        return x.id === action.payload.Habit_id;
      });
      console.log(HabitindexOfState, action.payload);
      const indexOfState = state.habits[HabitindexOfState].week.findIndex(
        (x) => {
          return x.week === action.payload.week;
        }
      );

      // const updatedArray = state.habits.map((obj) => {
      //   console.log(obj);
      //   if (obj.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   // Otherwise, return the original object
      //   return obj;
      // });
      // console.log(
      //   "updated array",
      //   updatedArray,
      //   state.habits[0].week[0].status
      // );

      // const indexOfState = state.habits
      //   .map((x) => {
      //     console.log("x", x);
      //     return x.id;
      //   })
      //   .indexOf(action.payload.id);

      console.log(state.habits[0]?.week[0], action.payload);
      console.log("edited state", state.habits[`${HabitindexOfState}`]);
      if (indexOfState != -1)
        state.habits[`${HabitindexOfState}`].week[indexOfState] =
          action.payload;
      return;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addHabit, removeHabit, editHabit, refreshHabit } =
  habitSlice.actions;

export default habitSlice.reducer;
