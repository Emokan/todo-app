import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/login" style={{ marginRight: "1rem" }}>Giriş</Link>
        <Link to="/register" style={{ marginRight: "1rem" }}>Kayıt</Link>
        <Link to="/todos">Görevler</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/todos" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todos"
          element={token ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;