// import { Link } from 'react-router-dom';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./navbar.css"
import {Link} from "react-scroll"
import SignupButton from "../signup/SignupButton.jsx"
import LoginButton from "../signup/LoginButton.jsx";
import {BsSticky} from "react-icons/all.d.ts";

function Navbar() {
    const navigate = useNavigate();
  return (
    <nav className={"sticky top-0 z-50"} >
        <div className="logo">
            <img src="img/logo.png" alt="" />
            Portfolio
        </div>
        <ul>
            <li><span>#</span> <Link to ='home' smooth={true}>home</Link> </li>
            <li><span>#</span> <Link to ='about' smooth={true}>about</Link> </li>
            <li><span>#</span> <Link to ='skills' smooth={true}>skills</Link> </li>
            <li><span>#</span> <Link to ='projects' smooth={true}>experience</Link> </li>
            <li><span>#</span> <Link to='contact' smooth={true}>contact</Link> </li>
        </ul>
        <SignupButton onClick={() => navigate('/signup')} />
        <LoginButton onClick={() => navigate('/login')} />
    </nav>
  )
}

export default Navbar