import * as React from "react";
import { Layout, Button, theme } from "antd";
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
import HomePage from "./Components/Home/HomePage";
import HotelChainsPage from "./Components/HotelChain/HotelChainsPage";
import HotelPage from "./Components/Hotel/HotelPage";
import RoomPage from "./Components/Room/RoomPage";
import FormPage from "./Components/Form/FormPage";
import ConfirmationPage from "./Components/Confirmation/ConfirmationPage";
import { useLocation } from "react-router-dom";
import MyBooking from "./Components/Booking/MyBooking";
import Profile from "./Components/Profile/Profile";

const { Header, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Container className="my-4">
        <Routes>
          {/* Login Page */}
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
            {/* Home Page */}
            <Route path="/home" element={<HomePage />} />

            {/* Hotel Chain Pages */}
            <Route path="/hotel-chains" element={<HotelChainsPage />} />
            <Route path="/hotel-chains/:chainId" element={<HotelPage />} />

            {/* Hotel Page */}
            <Route path="/hotels/:hotelId" element={<HotelPage />} />

            {/* Room Page */}
            <Route path="/rooms/:roomId" element={<RoomPage />} />
            <Route path="/mybooking" element={<MyBooking />} />
            <Route path="/profile" element={<Profile />} />
            {/* Form Page */}
            <Route path="/forms/:formType" element={<FormPage />} />
          </Route>

          {/* Confirmation Page */}
          <Route path="/confirmation" element={<ConfirmationPage />} />

          {/* Redirect to Home Page if route doesn't match */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

function WithSidebar({ children, collapsed, setCollapsed, colorBgContainer }) {
  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className="Sidebar"
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
  );
}

function renderPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === "/home") {
    return <HomePage />;
  } else if (currentPath === "/hotel-chains") {
    return <HotelChainsPage />;
  } else if (currentPath.startsWith("/hotel-chains/")) {
    return <HotelPage />;
  } else if (currentPath.startsWith("/hotels/")) {
    return <HotelPage />;
  } else if (currentPath.startsWith("/rooms/")) {
    return <RoomPage />;
  } else if (currentPath.startsWith("/forms/")) {
    return <FormPage />;
  } else if (currentPath === "/profile") {
    return <Profile />;
  } else if (currentPath === "/mybooking") {
    return <MyBooking />;
  } else {
    // Handle other paths
    return <div>Page not found</div>;
  }
}

/*
    const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
    <Routes>
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger = {null}
          
          className="Sidebar"
        >
          <Logo />
          <Sidebar />
          
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
          <Page/>
        </Layout>
      </Layout>
      </Routes>
    </>
  */
