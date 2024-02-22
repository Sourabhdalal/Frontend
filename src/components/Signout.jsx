
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Signout.css';

export default function Singout() {
  const navigate=useNavigate()
    const[showConfirmation,setShowConfirmation]=useState(false)
    const handleSignOut=()=>{
      sessionStorage.clear()
      navigate("/login");
    }
  return (
    <div className="signout-page">
      <div className="box">
    <h1 className="out">Sign Out</h1>
        <p>Are you really sure you want to sign out?</p>
        <div className="d-flex">
        <button className="btn btn-danger m-2" onClick={handleSignOut}>Confirm Sign Out</button>
        <button className="btn btn-success m-2" onClick={() => setShowConfirmation(false)}>Cancel</button>
        </div>
    </div>
  </div>
  )
}
