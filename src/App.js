import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Home from "./components/Main";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/consulta" element={<Home />}>
        </Route>
      </Routes>
    </Router>
  )
}