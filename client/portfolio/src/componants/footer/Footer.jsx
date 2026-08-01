import React from 'react'
import "./footer.css"
import {AiFillGithub, AiFillInstagram, AiFillLinkedin, AiOutlineMail} from "react-icons/ai"
import { useState, useEffect } from 'react'
import axios from 'axios'

function Footer() {
    const [user, setuser] = useState({})

    // useEffect(() => {
    //     // 1. Completely removed the headers object.
    //     // Axios will now send a normal, clean GET request.
    //     axios
    //         .get("http://localhost:9006/api/user/1")
    //         .then((response) => {
    //             setuser(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <div>
            <div className="footer">
                <span className="line"></span>
                <div className="upper">
                    <div className="something">
                        {/* 2. Added the '?' (optional chaining) so React doesn't crash if user_email is temporarily undefined */}
                        <span><img src="img/logo.png" alt="logo" /> {user?.user_email}</span>
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