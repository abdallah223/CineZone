/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import "./index.css";
import "@splidejs/react-splide/css/core";
import "@splidejs/splide/dist/css/splide.min.css";
import Movies from "./pages/Movies";
import { Routes, Route } from "react-router-dom";

import HomeLayout from "./components/HomeLayout";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  );
};
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomeLayout />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header />
              <Movies />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
