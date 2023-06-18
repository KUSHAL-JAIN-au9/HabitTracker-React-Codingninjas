import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddHabit = () => {
  const { state } = useLocation();

  console.log(state);
  return <div>{state.name}</div>;
};

export default AddHabit;
