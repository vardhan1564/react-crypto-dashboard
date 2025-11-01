import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./Pages/Home"
import Detail from "./Pages/Detail"
import Favorites from "./Pages/Favorites";


export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="logo">Crypto Dashboard</Link>
        <nav>
          <Link to="/favorites" className="fav-link">Favorites</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      <footer className="footer">
        CoinGecko API  Demo dashboard project - Vardhan Adheli
      </footer>
    </div>
  );
}
