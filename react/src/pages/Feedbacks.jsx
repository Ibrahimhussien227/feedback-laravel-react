import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { Navigate } from "react-router-dom";

import { Loader } from "../components";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Body",
    dataIndex: "body",
    key: "body",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  },
  {
    title: "User id",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "User Created At",
    dataIndex: "userCreatedAt",
    key: "userCreatedAt",
  },
  {
    title: "File",
    dataIndex: "file",
    key: "file",
  },
];

const Feedbacks = () => {
  const { user } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(null);
  const [requests, setRequests] = useState([]);

  const handleDownload = (file) => {
    const onClick = (e) => {
      e.preventDefault();
      axiosClient
        .get(`/download/${file}`, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file);
          document.body.appendChild(link);
          link.click();
        });
    };
    return (
      <Button type="primary" onClick={onClick}>
        {file}
      </Button>
    );
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/feedback")
      .then(({ data }) => {
        const result = data?.data?.map((row) => ({
          key: row.id,
          id: row.id,
          subject: row.subject,
          body: (
            <div
              style={{
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                width: "auto",
                minWidth: 400,
              }}
            >
              {row.body}
            </div>
          ),
          createdAt: row.created_at,
          userId: row.user_id,
          name: row.name,
          email: row.email,
          userCreatedAt: row.user_created_at,
          file: handleDownload(row.file),
        }));
        setRequests(result);
        setTotalItem(result.length);
        setLoading(false);
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

  if (loading) return <Loader />;
  return (
    <Table
      dataSource={requests}
      columns={columns}
      bordered
      pagination={{
        position: ["bottomCenter"],
        total: totalItem,
        pageSizeOptions: ["10", "50", "100"],
        defaultCurrent: 1,
        showSizeChanger: true,
      }}
      scroll={{ x: "fit-content" }}
      size="medium"
    />
  );
};

export default Feedbacks;
