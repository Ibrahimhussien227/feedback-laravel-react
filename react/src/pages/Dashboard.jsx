import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Loader } from "../components";

const Dashboard = () => {
  const { user } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({
    subject: "",
    body: "",
    file: "",
  });
  const [errors, setErrors] = useState(null);
  const ref = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosClient
      .post("/feedback/create", request, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setRequest({ subject: "", body: "", file: "" });
        ref.current.value = "";
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const { response } = err;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  if (user.role === 1) {
    return <Navigate to="/admin/feedback" />;
  }

  if (loading) return <Loader />;

  return (
    <div className="feedback-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Feedback</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input
            value={request.subject}
            onChange={(e) =>
              setRequest({ ...request, subject: e.target.value })
            }
            type="text"
            placeholder="Subject"
          />
          <textarea
            value={request.body}
            onChange={(e) => setRequest({ ...request, body: e.target.value })}
            placeholder="Enter your feedback"
          />
          <input
            ref={ref}
            onChange={(e) =>
              setRequest({ ...request, file: e.target.files[0] })
            }
            type="file"
          />
          <button className="btn btn-form" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
