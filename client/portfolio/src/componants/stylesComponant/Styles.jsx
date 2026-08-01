import React, { useState } from 'react'
import "./styles.css"
import {AiOutlineSetting ,AiOutlineUserSwitch, AiOutlineUser} from "react-icons/ai"
import {TbAbc} from "react-icons/tb"
import {BiUserCheck} from "react-icons/bi"
import {BsPaintBucket} from "react-icons/bs"
import { changeRole } from '../../features/user'
import { useDispatch, useSelector } from "react-redux"

// 1. Accept 'user' as a prop here (delete axios, useState for user, and useEffect)
function Styles({ user }) {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const {admin} = useSelector((state) => state.admin);

  function handleAdminChange(event) {
    setIsAdmin(event.target.value === 'admin');
    dispatch(changeRole(!isAdmin));
  }

  const handleMenu = () => {
    setOpen((prev) => !prev);
  }

  const handleColorChange = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
    window.localStorage.setItem("color",color);
  }

  const handleFontChange = (newFont) => {
    document.documentElement.style.setProperty('--main-font', newFont);
    window.localStorage.setItem("font",newFont);
  }

  return (
      <div className={`styles--menu ${(open) ? "open" : ""}`}>
        <div className={`settings ${(open === false) ? "rotate" : ""}`} onClick={handleMenu}>
          <AiOutlineSetting />
        </div>
        <div className="colors--wrapper">
          <div className="colors-icon">
            <BsPaintBucket />
          </div>
          <div className='colors--holder'>
            <button style={{backgroundColor : "#ffeb3b"}} className='colors' onClick={() => {handleColorChange("#ffeb3b")}}></button>
            <button style={{backgroundColor : "#ff5722"}} className='colors' onClick={() => {handleColorChange("#ff5722")}}></button>
            <button style={{backgroundColor : "#009688"}} className='colors' onClick={() => {handleColorChange("#009688")}}></button>
            <button style={{backgroundColor : "#2196f3"}} className='colors' onClick={() => {handleColorChange("#2196f3")}}></button>
            <button style={{backgroundColor : "#C778DD"}} className='colors' onClick={() => {handleColorChange("#C778DD")}}></button>
          </div>
        </div>
        <div className='fonts'>
          <div className="font-icon">
            <TbAbc />
          </div>
          <div className='font'>
            <span style={{fontFamily : "Fira Code"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, laudantium.</span>
            <button onClick={() => {handleFontChange("Fira Code")}}>set</button>
          </div>
          <div className='font'>
            <span style={{fontFamily : "Poppins"}}>Quo nisi mollitia tempora quasi dolore adipisci commodi, accusantium reprehenderit?</span>
            <button onClick={() => {handleFontChange("Poppins")}}>set</button>
          </div>
          <div className='font'>
            <span style={{fontFamily : "JetBrains Mono"}}>Nisi magnam ipsam libero error sit adipisci. Voluptatum, repudiandae delectus?</span>
            <button onClick={() => {handleFontChange("JetBrains Mono")}}>set</button>
          </div>
          <div className='font'>
            <span style={{fontFamily : "Source Code Pro"}}>Cum quibusdam ducimus eum, temporibus dignissimos necessitatibus commodi!</span>
            <button onClick={() => {handleFontChange("Source Code Pro")}}>set</button>
          </div>
        </div>

        {/* 2. Safely check user data passed down from App */}
        <div className={`role--wrapper ${user?.isAdmin === 1 ? "" : "user"}`}>
          <div className="role--icon">
            <AiOutlineUserSwitch />
          </div>
          <div className={`role`} >
          <span className="input">
            <input type="radio" checked={!isAdmin} value="user" onChange={handleAdminChange} name="role" id="user" /><label htmlFor='user'>View as guest <AiOutlineUser /></label>
          </span>
            <span className="input">
            <input type="radio" checked={isAdmin} value="admin" onChange={handleAdminChange} name="role" id="admin" /><label htmlFor='admin'>admin <BiUserCheck /></label>   
          </span>
          </div>
        </div>
      </div>
  )
}

export default Styles