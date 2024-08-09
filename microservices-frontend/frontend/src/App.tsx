import React from "react";
import "./assets/global.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Theme } from "./utils/GlobalInterfaces";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductListPage } from "./pages/ProductListPage";
import { ProductPage } from "./pages/ProductPage";
import Login from "./features/login/Login";
import Callback from "./helpers/CallBack";
import { OrdersPage } from "./pages/OrdersPage";


const theme: Theme = {
  colors: {
    blue: "#1DA1F2",
    black: "#14171a",
    darkGray: "#657786",
    gray: "#AAB8C2",
    lightGray: "#E1E8ED",
    white: "#f5f8fa",
    error: "red",
  },
};

const GlobalStyle = createGlobalStyle`
*{

}
`;

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/callback" element={<Callback/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/orders" element={<OrdersPage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/products/:category" element={<ProductListPage/>} />
        <Route path="/product/:id" element={<ProductPage/>} />
      </Routes>
    </ThemeProvider>
  );
};