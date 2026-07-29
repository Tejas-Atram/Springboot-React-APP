import React from 'react'
import "./footer.css"
import {AiFillGithub, AiFillInstagram, AiFillLinkedin, AiOutlineMail} from "react-icons/ai"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Footer() {
    const [user, setuser] = useState({})

  useEffect(() => {
    axios
      .get("http://localhost:9006/api/user/1", {
      headers: {
          "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
          "Content-Type": "application/json",
      },
      })
      .then((response) => {
      setuser(response.data);
      })
      .catch((error) => {
      console.log(error);
      });
    }, []);
  return (
    <div>
        <div className="footer">
            <span className="line"></span>
            <div className="upper">
                <div className="something">
                    <span><img src="img/logo.png" /> {user.user_email}</span>
                    <span>FullStack Web Developer with AI </span>
                </div>
                <div className="media">
                    <span>Media</span>
                    <span> 
                        <AiFillInstagram />
                        <AiFillGithub />
                        <AiFillLinkedin />
                    </span>
                </div>
            </div>
            <div className="lower">
                © Copyright 2026.
            </div>
        </div>
    </div>
  )
}

export default Footer