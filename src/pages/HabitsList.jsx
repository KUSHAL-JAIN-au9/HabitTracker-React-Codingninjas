import React from "react";
import HabitCard from "../components/Card/HabitCard";
// import { modal } from "../App";
import Calendar from "../icons/Calendar.png";
import { Link } from "react-router-dom";
import { modal } from "../App";

const HabitsList = ({ habits, setEditModalId }) => {
  console.log("habits all", habits || "no habits");
  return (
    <div className="w-full h-auto min-h-screen gap-y-20   bg-lime-950 flex flex-row flex-wrap justify-start items-center ">
      {habits?.map((habit) => (
        // <HabitCard
        //   habit={habit}
        //   key={habit?.id}
        //   setEditModalId={setEditModalId}
        // />
        // { const modal = new Modal($targetEl, options)}
        <div className="w-1/6 h-70 max-w-sm my-10 mx-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className=" w-full flex flex-col items-center pb-10 px-4 pt-4">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={Calendar}
              alt="Bonnie image"
            />
            <Link to={"/add"} state={habit}>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {habit?.name}
              </h5>
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Visual Designer
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                type="button"
                data-modal-target="small-modal"
                data-modal-toggle="small-modal"
                onClick={() => {
                  console.log(habit);
                  console.log(modal);
                  setEditModalId(habit?.name);
                  modal?.toggle();
                }}
                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Edit
              </button>
              <button
                type="button"
                data-modal-target="small-modal"
                data-modal-toggle="small-modal"
                onClick={() => {
                  console.log(modal);
                  modal?.toggle();
                }}
                className="text-white bg-gradient-to-r inline from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm  text-center mr-2 mb-2 px-6 py-3.5"
              >
                hiii
              </button>
              <button
                type="button"
                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(removeHabit(habit?.id));
                  //   history("-1");
                }}
              >
                Delete
              </button>
              {/* <Button type={"submit"} label={"Delete"} /> */}
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        data-modal-target="small-modal"
        data-modal-toggle="small-modal"
        onClick={() => {
          console.log(modal);
          modal?.toggle();
        }}
        className="text-white bg-gradient-to-r inline from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm  text-center mr-2 mb-2 px-6 py-3.5"
      >
        hiii
      </button>
    </div>
  );
};

export default HabitsList;
