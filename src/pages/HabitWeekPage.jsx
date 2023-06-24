import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HabitCard from "../components/Card/HabitCard";

const HabitWeekPage = () => {
  const { state } = useLocation();

  console.log(state);
  return (
    <div className="w-full min-h-screen gap-y-20   bg-lime-950 flex flex-row flex-wrap justify-start items-center ">
      {state.week.map((item) => {
        return (
          <HabitCard
            habit={item}
            key={state?.id}
            type={"week"}
            allHabits={state}
          />
        );
      })}
      ;
    </div>
  );
};

export default HabitWeekPage;
