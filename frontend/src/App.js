import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import VoiceAssistant from "./VoiceAssistant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<VoiceAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;