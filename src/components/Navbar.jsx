import React, { useState } from 'react'
import { faPowerOff, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import logo from '../assets/Doctor-on-Call.png'

const Navbar = () => {

    const[login,setLogin]=useState(false)
 
    return (
    <>

    <nav class="navbar navbar-expand-md">
    <div class="container-fluid">
        <a class="navbar-brand abs" href="#" style={{color: "#28bf96"}}><img src={logo} style={{height:"100px",width:"100px"}}></img></a>
        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="collapseNavbar">
           
            <ul class="navbar-nav ms-auto">

        {
            sessionStorage["patientId"] ? (
                <li className="nav-item px-4" >
                    <a className="nav-link" href="/patient/home" style={{color:"#28bf96"}}>Home</a>
                     {/* <Link to="/patient/appointment">Appointments</Link> */}
                </li>
            ) : sessionStorage['doctorId'] ? (
                <li className="nav-item px-4" >
                    <a className="nav-link" href="/doctor/home" style={{color:"#28bf96"}}>Home</a>
                     {/* <Link to="/doctor/appointment">Appointments</Link> */}
                </li>
            ) : ("")
        }

        {/* Appointment button */}
        { 
            sessionStorage["patientId"] ? (
                <li className="nav-item px-4" >
                    <a className="nav-link" href="/patient/appointment" style={{color:"#28bf96"}}>Appointments</a>
                     {/* <Link to="/patient/appointment">Appointments</Link> */}
                </li>
            ) : sessionStorage['doctorId'] ? (
                <li className="nav-item px-4" >
                    <a className="nav-link" href="/doctor/appointment" style={{color:"#28bf96"}}>Appointments</a>
                     {/* <Link to="/doctor/appointment">Appointments</Link> */}
                </li>
            ) : ("")
        }


        {/* History Button */}    
        {
            sessionStorage["patientId"] ? (
                <li class="nav-item px-4">
                    <a class="nav-link" href="/patient/history" style={{color:"#28bf96"}}>History</a>
                </li>
                ) : sessionStorage['doctorId'] ? (
                    <li className="nav-item px-4" >
                        <a className="nav-link" href="/doctor/history" style={{color:"#28bf96"}}>History</a>
                        
                    </li>
            ) : ("")
        }

        {/* Show Profile button after login*/}
        {
            sessionStorage["patientId"] ? (
                <li className="nav-item px-4" >
                    <a className="nav-link" href="/patient/profile" style={{color:"#28bf96"}}>
                         Profile <FontAwesomeIcon className="navbar-icon" icon={faUser} /></a>
                </li>
            ) : sessionStorage['doctorId'] ? (
                <li className="nav-item px-4" >
                    <a className="nav-link" href="/doctor/profile" style={{color:"#28bf96"}}>
                        Profile <FontAwesomeIcon className="navbar-icon" icon={faUser} /></a>
                </li>
            ) : ("")
        }

        {/* Show Sihnup Login button before login*/}
        {
            sessionStorage['patientId']  ? ("") :
            sessionStorage['doctorId'] ? ("") :
            (
            <div>
                <div class="dropdown" style={{color:"#28bf96"}}>
                <button class="btn dropdown" type="button" id="dropdownMenuButton1"
                 data-bs-toggle="dropdown" aria-expanded="false" style={{color:"#28bf96"}}>
                    Profile <FontAwesomeIcon className="navbar-icon" icon={faUser} />
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="/login">Login</a></li>
                    <li><a class="dropdown-item" href="/register/patient">Patient</a></li>
                    <li><a class="dropdown-item" href="/register/doctor">Doctor</a></li>
                </ul>
                </div>
            </div>
            ) 
        }

        {
            sessionStorage["patientId"] || sessionStorage["doctorId"] ? (
                <li className="nav-item px-4" >
                    <a className="nav-link" href="/logout" style={{color:"#28bf96"}}>
                        <FontAwesomeIcon className="navbar-icon" icon={faPowerOff} /></a>
                </li>
            ) : ("")
        }


            {/* {!sessionStorage["patientId"] ? (
                <div class="dropdown" style={{color:"#28bf96"}}>
                <button class="btn dropdown" type="button" id="dropdownMenuButton1"
                 data-bs-toggle="dropdown" aria-expanded="false" style={{color:"#28bf96"}}>
                Hello {sessionStorage["name"]}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="/logout">Logout</a></li>
                </ul>
                </div>
                ):(       
                <div class="dropdown" style={{color:"#28bf96"}}>
                <button class="btn dropdown" type="button" id="dropdownMenuButton1"
                 data-bs-toggle="dropdown" aria-expanded="false" style={{color:"#28bf96"}}>
                    Profile <FontAwesomeIcon className="navbar-icon" icon={faUser} />
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="/login">Patient</a></li>
                    <li><a class="dropdown-item" href="/login">Doctor</a></li>
                </ul>
                </div>
            )} */}
            </ul>
        </div>
        </div>
    </nav>
   
    </>
  )
}

export default Navbar