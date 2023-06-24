import React, { useEffect, useState } from "react";
import Calendar from "../../icons/Calendar.png";
import WeekView from "../../icons/planning.png";
import { Link, useNavigate } from "react-router-dom";
import { editHabit, refreshHabit, removeHabit } from "../../redux/habits";
import { useDispatch, useSelector } from "react-redux";
import { modal } from "../../App";
import { getDate, isDateInFuture } from "../../utils/getDate";

const HabitCard = ({ habit, setEditModalId, type, allHabits }) => {
  const [today, settoday] = useState({});
  let count = 0;

  const { refresh, habits } = useSelector((state) => state.habits);
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
    getHabit();
    console.log("hii", refresh);
  }, [refresh]);

  const getHabit = () => {
    const objHabit = habits.filter((obj) => obj.id === allHabits.id);
    const objHabitWeek = objHabit[0].week.filter((obj) => obj.id === habit.id);
    console.log(objHabit, habits, allHabits);
    console.log(habit, objHabitWeek);
    settoday(objHabitWeek[0]);
  };

  const handleChangeStatus = (status, week, e) => {
    // e.preventDefault();
    // if (count >= 1)
    //   alert(
    //     "u can only change status one time try going back home and click habit to change status"
    //   );
    // count++;
    console.log(status, week, habit);
    console.log(allHabits, e);

    let changedWeek = allHabits.week.filter((item) => item.week == week);
    const myObject = { ...changedWeek[0], status: status };
    const i = allHabits.week.findIndex((x) => x.week === week);
    console.log("week filter", i, changedWeek[0]);
    console.log("index is", i, myObject);

    const updatedArray = allHabits.week.map((obj) => {
      console.log(obj);
      if (obj.week === week) {
        return myObject;
      }
      // Otherwise, return the original object
      return obj;
    });

    // allHabits.week.splice(i, 1, myObject);
    console.log(allHabits?.week, updatedArray);

    // allHabits.week[i].status = status;

    // Object.defineProperty(allHabits.week[i], "status", {
    //   value: status,
    //   configurable: true,
    //   writable: true,
    //   enumerable: true,
    // });
    // let descriptor = Object.getOwnPropertyDescriptor(changedWeek[0], "status");
    // console.log("descriptor", descriptor);
    // changedWeek[0].status = status;
    // const returnedTarget = Object.assign(changedWeek[0], { status });
    // console.log(returnedTarget);

    // const payload = {
    //   id: allHabits.id,
    //   name: allHabits.name,
    //   week: [...updatedArray],
    // };

    const payload = {
      id: updatedArray[i].id,
      date: updatedArray[i].date,
      week: updatedArray[i].week,
      status,
      Habit_id: allHabits.id,
    };

    console.log(payload);
    dispatch(editHabit(payload));
    dispatch(refreshHabit());
    // history("/");
  };

  console.log("habit single", habit, today);
  return (
    <div
      className={
        "w-1/6 h-96 items-stretch max-w-sm my-10 mx-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  " +
        (isDateInFuture(habit?.date.split(",")[0]) && `grayscale`)
      }
    >
      <div className=" w-full flex flex-col items-center pb-10 px-4 pt-4">
        <img
          className="w-20 h-20  shadow-lg mb-5"
          src={type !== "week" ? Calendar : WeekView}
          alt="Bonnie image"
        />
        {type !== "week" ? (
          <Link to={"/add"} state={habit}>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {habit?.name}
            </h5>
          </Link>
        ) : (
          <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
            {habit?.week}
          </h5>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {type !== "week" ? habit?.name : habit?.date.split(",")[0]}
        </span>
        {type == "week" && (
          <span
            class={
              today?.status == "done"
                ? "habit-status-done-icon"
                : "habit-status-notdone-icon"
            }
          >
            <span
              class={
                today?.status == "done"
                  ? "habit-status-done"
                  : "habit-status-notdone"
              }
            ></span>
            status: {today?.status}
          </span>
          // <span className="text-sm text-gray-500 dark:text-gray-400">
          //   status:{today?.status}
          // </span>
        )}
        <div className="flex mt-4 space-x-3">
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
              {(today?.status == "not done" || today?.status == "none") && (
                <button
                  type="button"
                  class={
                    isDateInFuture(habit?.date.split(",")[0])
                      ? "btn-disabled-card"
                      : "text-gray-900 inline w-40  cursor-pointer hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 "
                  }
                  disabled={isDateInFuture(habit?.date.split(",")[0])}
                  onClick={(e) => handleChangeStatus("done", habit?.week, e)}
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

              {(today?.status == "done" || today?.status == "none") && (
                <button
                  type="button"
                  class={
                    isDateInFuture(habit?.date.split(",")[0])
                      ? "btn-disabled-card"
                      : "text-gray-900 inline w-40 cursor-pointer hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 "
                  }
                  disabled={isDateInFuture(habit?.date.split(",")[0])}
                  onClick={(e) =>
                    handleChangeStatus("not done", habit?.week, e)
                  }
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
