import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const DefaultLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => setUser(data));
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="defaultLayout">
      <div className="content">
        <header>
          <h1>Header</h1>
          <div>
            {user.name}
            <a className="btn-logout" href="/login" onClick={onLogout}>
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
