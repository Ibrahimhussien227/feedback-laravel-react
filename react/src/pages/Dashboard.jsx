import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Dashboard = () => {
  const { user, token, setUser, setToken } = useStateContext();

  if (user.role === 1) {
    return <Navigate to="/admin/users" />;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
