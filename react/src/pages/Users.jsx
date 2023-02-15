import React, { useEffect, useState } from "react";

import axiosClient from "../axios-client";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return <div>Users</div>;
};

export default Users;
