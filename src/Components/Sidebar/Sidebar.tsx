import React from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { AreaChartOutlined } from "@ant-design/icons";

const Sidebar = () => {
  return (
    <Menu theme="dark">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="activity" icon={<AppstoreOutlined />}>
        Activity
      </Menu.Item>
      <Menu.Item key="progress" icon={<AreaChartOutlined />}>
        Progress
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
