import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Users = () => {
  const { user } = useStateContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/admin/users")
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (user.role === 0) {
    return <Navigate to="/dashboard" />;
  }

  return <div>Users</div>;
};

export default Users;
