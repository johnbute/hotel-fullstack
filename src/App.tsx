import * as React from "react";
import { Layout, Button, theme, ConfigProvider } from "antd";
import "./App.css";
import HotelChain from "./Components/HotelChain/HotelChain";
import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar";
import Logo from "./Components/Logo/Logo";
import { useState } from "react";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { Route, Routes, Navigate } from "react-router";
import { Container } from "react-bootstrap";
import NewHotelChain from "./Components/HotelChain/HotelChainsPage";

import HotelChainsPage from "./Components/HotelChain/HotelChainsPage";
import HotelPage from "./Components/Hotel/HotelPage";
import RoomPage from "./Components/Room-List/RoomPage";
import ConfirmationPage from "./Components/Confirmation/ConfirmationPage";
import { useLocation } from "react-router-dom";
import MyBooking from "./Components/Booking/MyBooking";
import Profile from "./Components/Profile/Profile";
import { IsEmployeeProvider } from "./Context/IsEmployeeContext";
const { Header, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <IsEmployeeProvider>
        <Container className="my-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <WithSidebar
                  children={renderPage()}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  colorBgContainer={colorBgContainer}
                />
              }
            >
              <Route path="/hotel-chains" element={<HotelChainsPage />} />
              <Route path="/hotel-chains/:chainId" element={<HotelPage />} />

              <Route path="/hotel/:hotelId" element={<RoomPage />} />

              <Route path="/mybooking" element={<MyBooking />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/confirmation" element={<ConfirmationPage />} />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
      </IsEmployeeProvider>
    </>
  );
}

export default App;

function WithSidebar({ children, collapsed, setCollapsed, colorBgContainer }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Sider: {},
        },
      }}
    >
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          className="Sidebar"
          width={"400px"}
          max-width={"400px"}
          min-width={"400px"}
        >
          <div className="h-screen">
            <Logo />
            <Sidebar />
          </div>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            />
          </Header>
          <div className="children">{children}</div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

function renderPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === "/hotel-chains") {
    return <HotelChainsPage />;
  } else if (currentPath.startsWith("/hotel-chains/")) {
    return <HotelPage />;
  } else if (currentPath.startsWith("/hotel/")) {
    return <RoomPage />;
  } else if (currentPath === "/profile") {
    return <Profile />;
  } else if (currentPath === "/mybooking") {
    return <MyBooking />;
  } else {
    return <div>Page not found</div>;
  }
}
