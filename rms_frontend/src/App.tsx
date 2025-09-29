import { BrowserRouter, Routes, Route } from "react-router-dom";
import Career from "./pages/Career";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Mission from "./pages/Mission";
import type { JSX } from "react";
import Footer from "./components/Footer";
import ViewJob from "./pages/ViewJob";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import JobApply from "./pages/JobApply";
import MyApplications from "./pages/MyApplications";
import EditProfile from "./pages/EditPage";
import ApplicationDetails from "./pages/ApplicationDetails";

function App(): JSX.Element {
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/viewjob/:id" element={<ViewJob/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/apply/:jobId" element={<JobApply/>}/>
        <Route path="/myApplications" element={<MyApplications/>}/>
        <Route path="/application/:id" element={<ApplicationDetails/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
      </Routes>
    </BrowserRouter>
     <Footer/>
     </div>
  );
}

export default App;
