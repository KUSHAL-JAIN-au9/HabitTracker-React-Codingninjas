import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input/input";
import Button from "./components/button/button";
import Form from "./components/form/form";
import { useDispatch, useSelector } from "react-redux";
import { addHabit, editHabit, removeHabit } from "./redux/habits";
import { addDays, getDate } from "./utils/getDate";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import AddHabit from "./pages/AddHabit";
import { Modal } from "flowbite";
import ModalLayout from "./Layout/Modal";
import HabitsList from "./pages/HabitsList";

export const $targetEl = document.getElementById("small-modal");

// options with default values
export const options = {
  placement: "bottom-right",
  backdrop: "dynamic",
  backdropClasses:
    "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("modal is hidden");
  },
  onShow: () => {
    console.log("modal is shown");
  },
  onToggle: () => {
    console.log("modal has been toggled");
  },
};

export const modal = new Modal($targetEl, options);

function App() {
  const [habit, setHabit] = useState("");
  const [editModalId, setEditModalId] = useState("");
  const [today, settoday] = useState(getDate());
  const count = useSelector((state) => state.counter.value);
  const habits = useSelector((state) => state.habits.habits);

  const dispatch = useDispatch();
  useEffect(() => {}, [habits.length]);

  const weekLog = [
    {
      id: 1,
      date: addDays(today.today, 0).dateString,
      week: addDays(today.today, 0).weekday,
      status: "none",
    },
    {
      id: 2,
      date: addDays(today.today, 1).dateString,
      week: addDays(today.today, 1).weekday,
      status: "none",
    },
    {
      id: 3,
      date: addDays(today.today, 2).dateString,
      week: addDays(today.today, 2).weekday,
      status: "none",
    },
    {
      id: 4,
      date: addDays(today.today, 3).dateString,
      week: addDays(today.today, 3).weekday,
      status: "none",
    },
    {
      id: 5,
      date: addDays(today.today, 4).dateString,
      week: addDays(today.today, 4).weekday,
      status: "none",
    },
    {
      id: 6,
      date: addDays(today.today, 5).dateString,
      week: addDays(today.today, 5).weekday,
      status: "none",
    },
    {
      id: 7,
      date: addDays(today.today, 6).dateString,
      week: addDays(today.today, 6).weekday,
      status: "none",
    },
  ];

  useEffect(() => {
    console.log(habits);
  }, []);

  const handleHabitSUbmit = () => {
    console.log("hhh", habit);
    const HabitId = Math.floor(Math.random(Date.now()) * 100);

    const habitData = { id: HabitId, name: habit, week: weekLog };
    console.log("habitData", habitData, HabitId);
    dispatch(addHabit(habitData));
    setHabit("");
  };
  const handleHabitChange = (e) => {
    console.log("onchage", e.target.value);
    setHabit(e.target.value);
  };

  console.log("h", habits);
  console.log("date", today);
  console.log("week", weekLog);
  console.log("setEditModalId", editModalId);
  return (
    <>
      <Navbar modal={modal} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HabitsList habits={[...habits]} setEditModalId={setEditModalId} />
          }
        />
        <Route exact path="/add" element={<AddHabit />} />
      </Routes>

      {/* modal to add habit */}
      <ModalLayout
        modal={modal}
        header={"Add a Habit"}
        setHabit={setHabit}
        onSubmit={handleHabitSUbmit}
        setEditModalId={setEditModalId}
      >
        <Form>
          <Input
            type={"text"}
            placeholder={"add  a habit"}
            label={"Habit"}
            id={"habit-title"}
            required={true}
            value={habit}
            editModalId={editModalId}
            onchange={handleHabitChange}
          />
        </Form>
      </ModalLayout>
    </>
  );
}

export default App;
