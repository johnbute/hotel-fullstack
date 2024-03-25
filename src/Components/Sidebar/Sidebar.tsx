import React from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { AreaChartOutlined } from "@ant-design/icons";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Menu
      theme="dark"
      style={{ textAlign: "center", fontSize: "25px" }}
      onClick={({ key }) => {
        navigate(key);
      }}
    >
      <Menu.Item key="hotel-chains" icon={<HomeOutlined />}>
        Discover
      </Menu.Item>
      <Menu.Item key="mybooking" icon={<AppstoreOutlined />}>
        Bookings
      </Menu.Item>
      <Menu.Item key="profile" icon={<AreaChartOutlined />}>
        Profile
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
