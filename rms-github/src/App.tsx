import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InterviewListPage from "./Pages/InterviewListPage";
import ApplicationDetailsPage from "./Pages/ApplicationDetailsPage";
import LoginPage from "./Pages/LoginPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/interviewList" element={<InterviewListPage />} />
        <Route path="/application/:applicationId" element={<ApplicationDetailsPage />} />
      </Routes>
    </Router>
  );
}