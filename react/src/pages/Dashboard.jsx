import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Dashboard = () => {
  const { user, token, setUser, setToken } = useStateContext();

  if (user.role === 1) {
    return <Navigate to="/admin/users" />;
  }

  return (
    <div className="feedback-form animated fadeInDown">
      <div className="form">
        <form onSubmit={() => {}}>
          <h1 className="title">Feedback</h1>
          {/* {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )} */}
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Enter your feedback" />
          <input type="file" placeholder="Password" />
          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
