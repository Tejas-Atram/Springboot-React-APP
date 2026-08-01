import { useState, useEffect } from 'react'
import './App.css'
import Home from './componants/home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProjects from './componants/allProjects/AllProjects';
import AllAbout from './componants/allAbout/AllAbout';
import AllSkills from './componants/allSkills/AllSkills';
import Signup from './componants/signup/Signup.jsx'
import Login from './componants/signup/Login.jsx';
// import Signup from './components/Signup';
import axios from 'axios';

function App() {
  const color = window.localStorage.getItem('color');
  const font = window.localStorage.getItem('font');

  if (color != null) {
    document.documentElement.style.setProperty('--primary-color', color);
  }
  if (font != null) {
    document.documentElement.style.setProperty('--main-font', font);
  }

  const [user, setuser] = useState({});

  // // useEffect(() => {
  // //   // 1. Removed the custom headers. Axios will now send a standard GET request.
  // //   // 2. Ensure your browser address bar says "http://localhost:5173", not "127.0.0.1"
  // //   axios
  // //       .get("http://localhost:9006/api/user/1")
  // //       .then((response) => {
  // //         setuser(response.data);
  // //       })
  // //       .catch((error) => {
  // //         console.log(error);
  // //       });
  // }, []);

  return (
      // Added the future flags here to fix your v7 console warning
      <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
      >
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="projects" element={<AllProjects user={user} />} />
          <Route path="about" element={<AllAbout />} />
          <Route path="skills" element={<AllSkills />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;