import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/Input/input";
import Button from "./components/button/button";
import Form from "./components/form/form";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./redux/counter";
import { addHabit, editHabit, removeHabit } from "./redux/habits";
import { addDays, getDate } from "./utils/getDate";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
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

// const ModalObj = new Modal($targetEl, options);

function App() {
  const [habit, setHabit] = useState("");
  const [editModalId, setEditModalId] = useState("");
  const [today, settoday] = useState(getDate());
  const count = useSelector((state) => state.counter.value);
  const habits = useSelector((state) => state.habits.habits);
  const dispatch = useDispatch();
  useEffect(() => {
    // (() => {
    // if (habits.length > 0) {
    //   const progress = habits[0]?.week.filter((item) => item.status == "done");

    //   sethabitProgress(progress.length);
    //   console.log("progress", progress);
    //   console.log("progress", habits.week);
    // }

    // })();

    console.log($targetEl);
    // if ($targetEl) setModal(ModalObj);
  }, [habits.length]);

  // set the modal menu element
  // const $targetEl = document.getElementById("small-modal");

  const weekLog = [
    {
      id: 1,
      date: addDays(today.today, 0).dateString,
      week: addDays(today.today, 0).weekday,
      status: "not done",
    },
    {
      id: 2,
      date: addDays(today.today, 1).dateString,
      week: addDays(today.today, 1).weekday,
      status: "not done",
    },
    {
      id: 3,
      date: addDays(today.today, 2).dateString,
      week: addDays(today.today, 2).weekday,
      status: "not done",
    },
    {
      id: 4,
      date: addDays(today.today, 3).dateString,
      week: addDays(today.today, 3).weekday,
      status: "not done",
    },
    {
      id: 5,
      date: addDays(today.today, 4).dateString,
      week: addDays(today.today, 4).weekday,
      status: "not done",
    },
    {
      id: 6,
      date: addDays(today.today, 5).dateString,
      week: addDays(today.today, 5).weekday,
      status: "not done",
    },
    {
      id: 7,
      date: addDays(today.today, 6).dateString,
      week: addDays(today.today, 6).weekday,
      status: "not done",
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
      <h1 className="text-3xl font-bold underline">
        Hello world! {habits[0]?.name || "no habit"}
      </h1>
      <div>
        <div>
          <button
            aria-label="Increment value"
            // onClick={() => dispatch(increment())}
            onClick={() => dispatch(addHabit({ id: 1, name: "eat" }))}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            // onClick={() => dispatch(decrement())}
            onClick={() => dispatch(removeHabit(1))}
          >
            Decrement
          </button>
          <button
            aria-label="Decrement value"
            // onClick={() => dispatch(decrement())}
            onClick={() => dispatch(editHabit({ id: 1, name: "dance" }))}
          >
            edit
          </button>
        </div>
      </div>
      {/* <button
        data-modal-target="small-modal"
        data-modal-toggle="small-modal"
        // data-modal-show="small-modal"
        // data-modal-hide="small-modal"
        class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          modal.toggle();
        }}
      >
        Small modal
      </button> */}
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
