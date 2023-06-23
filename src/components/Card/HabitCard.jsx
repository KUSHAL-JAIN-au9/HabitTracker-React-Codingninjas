import React, { useEffect, useState } from "react";
import Calendar from "../../icons/Calendar.png";
import WeekView from "../../icons/planning.png";
import Button from "../button/button";
import { Link, useNavigate } from "react-router-dom";
import { editHabit, refreshHabit, removeHabit } from "../../redux/habits";
import { useDispatch, useSelector } from "react-redux";
import { modal } from "../../App";
import { getDate, isDateInFuture } from "../../utils/getDate";

const HabitCard = ({ habit, setEditModalId, type, allHabits }) => {
  const [today, settoday] = useState("");

  const { refresh } = useSelector((state) => state.habits);
  const history = useNavigate();
  const dispatch = useDispatch();
  console.log("refresh", refresh);
  useEffect(() => {
    // (async () => {
    //   const today = await getDate().date;
    //   // console.log(habit?.date.split(",")[0] == today);
    //   console.log(isDateInFuture(habit?.date.split(",")[0]));
    //   settoday(today);
    // })();
    console.log("hii", refresh);
  }, [refresh]);

  const handleChangeStatus = (status, week) => {
    console.log(status, week, habit);
    console.log(allHabits);

    let changedWeek = allHabits.week.filter((item) => item.week == week);

    console.log(changedWeek);
    // Object.defineProperties(changedWeek[0], {
    //   status: {
    //     value: status,
    //     writable: true, // 👈️ set property to writable
    //     configurable: true,
    //     enumerable: true,
    //   },
    // });

    Object.defineProperty(changedWeek[0], "status", {
      value: status,
      configurable: true,
      writable: true,
      enumerable: true,
    });
    let descriptor = Object.getOwnPropertyDescriptor(changedWeek[0], "status");
    console.log("descriptor", descriptor);
    // changedWeek[0].status = status;
    // const returnedTarget = Object.assign(changedWeek[0], { status });
    // console.log(returnedTarget);
    const payload = {
      id: allHabits.id,
      name: allHabits.name,
      week: [...allHabits.week],
    };
    console.log(changedWeek, payload);
    dispatch(editHabit(payload));
    dispatch(refreshHabit());
    // history("/");
  };

  console.log("habit single", habit);
  return (
    <div
      className={
        "w-1/6  max-w-sm my-10 mx-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  " +
        (isDateInFuture(habit?.date.split(",")[0]) && `grayscale`)
      }
    >
      <div className=" w-full flex flex-col items-center pb-10 px-4 pt-4">
        <img
          className="w-20 h-20  shadow-lg mb-5"
          src={type !== "week" ? Calendar : WeekView}
          alt="Bonnie image"
          // width={20}
          // height={20}
        />
        {type !== "week" ? (
          <Link to={"/add"} state={habit}>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {habit?.name}
            </h5>
          </Link>
        ) : (
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {habit?.week}
          </h5>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {type !== "week" ? habit?.name : habit?.date.split(",")[0]}
        </span>
        {type == "week" && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            status:{habit?.status}
          </span>
        )}
        <div className="flex mt-4 space-x-3">
          {/* <a
            href="#"
            className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </a> */}
          {type !== "week" ? (
            // <button
            //   type="button"
            //   data-modal-target="small-modal"
            //   data-modal-toggle="small-modal"
            //   onClick={() => {
            //     console.log(habit);
            //     setEditModalId(habit?.name);
            //     modal?.toggle();
            //   }}
            //   class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            // >
            //   Edit
            // </button>
            // <button
            //   type="button"
            //   data-modal-target="small-modal"
            //   data-modal-toggle="small-modal"
            //   onClick={() => {
            //     console.log(modal);
            //     modal?.toggle();
            //   }}
            //   class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            // >
            //   hiii
            // </button>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-20"
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeHabit(habit?.id));
                //   history("-1");
              }}
            >
              Delete
            </button>
          ) : (
            <div className="flex flex-col justify-around items-end  space-x-3 ">
              {(habit?.status == "not done" || habit?.status == "none") && (
                <button
                  type="button"
                  class={
                    isDateInFuture(habit?.date.split(",")[0])
                      ? "btn-disabled-card"
                      : "text-gray-900 inline w-40  cursor-pointer hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 "
                  }
                  disabled={isDateInFuture(habit?.date.split(",")[0])}
                  onClick={() => handleChangeStatus("done", habit?.week)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 inline mr-2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#A9A3A3"
                      id="check-circle"
                      className="hover:fill-green-400"
                      d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                    ></path>
                  </svg>
                  <span className="inline">done</span>
                </button>
              )}
              {/* <button
                type="button"
                class=" btn-not-done text-gray-900 inline hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 inline mr-2"
                  viewBox="0 0 24 24"
                  id="ban"
                >
                  <path
                    fill="#A2A2A2"
                    className="hover:fill-red-600"
                    d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,0,1-8-8A7.92,7.92,0,0,1,5.69,7.1L16.9,18.31A7.92,7.92,0,0,1,12,20Zm6.31-3.1L7.1,5.69A7.92,7.92,0,0,1,12,4a8,8,0,0,1,8,8A7.92,7.92,0,0,1,18.31,16.9Z"
                  ></path>
                </svg>
                <span className="inline">not done</span>
              </button> */}

              {(habit?.status == "done" || habit?.status == "none") && (
                <button
                  type="button"
                  class={
                    isDateInFuture(habit?.date.split(",")[0])
                      ? "btn-disabled-card"
                      : "text-gray-900 inline w-40 cursor-pointer hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 "
                  }
                  disabled={isDateInFuture(habit?.date.split(",")[0])}
                  onClick={() => handleChangeStatus("not done", habit?.week)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 inline mr-1"
                    viewBox="0 0 24 24"
                    id="ban"
                  >
                    <path
                      fill="#A2A2A2"
                      className="hover:fill-red-600"
                      d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,0,1-8-8A7.92,7.92,0,0,1,5.69,7.1L16.9,18.31A7.92,7.92,0,0,1,12,20Zm6.31-3.1L7.1,5.69A7.92,7.92,0,0,1,12,4a8,8,0,0,1,8,8A7.92,7.92,0,0,1,18.31,16.9Z"
                    ></path>
                  </svg>
                  <span className="inline"> not done</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
