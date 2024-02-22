// PersonalInfoPage.js
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './DoctorDetail.css'; // Import your CSS file for styling
import profile from '../assets/default_profile.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { URL } from '../config';


const DoctorDetail = () => {
  // Sample personal information data
  const personalInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobileNumber: '123-456-7890',
    review: 'An amazing person!',
    visitingCharges: '$50',
    estimatedTime: '45 minutes',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    career: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    // Add more details as needed
  };
  
  const[doctorData, setDoctorData] = useState({})
  const location=useLocation()
  
  const did = location.state
  const navigate=useNavigate();
  useEffect(() => {
    const GetAllDoctor = async () => {
      try {
        const response = await axios.get(`${URL}/doctor/`+did);
        setDoctorData(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Doctor:', error);
      }
    };
    GetAllDoctor();
  }, []);

  // Book Appointment function use navigate
  const bookAppointment = (did, dname) => {
    // console.log(did);
    navigate('/patient/appointmentform', {state:[did,dname]})
  }
  let appointment=()=>{}

  return (
    <>
    <div className="personal-info-container">

      <div className="profile-photo">
        <img
          src={profile}
          alt="Profile"
          style={{ width: '100px', height: '100px',borderRadius:"50%",margin:"40px 20px",scale:"1.5" }}
        />
      </div>
      <div className="personal-details">
        <div className="column">
          <h2>{doctorData.doctorName}</h2>
          <p>Email: {doctorData.doctorEmail}</p>
          <p>Mobile: {doctorData.doctorPhoneNumber}</p>
          
            <h4>About:</h4>
            <p>{personalInfo.about}</p>
        </div>
        <div className="column">
            <p>Review:{personalInfo.review}</p>
          <p>Visiting Charges: 400 </p>
          <p>Estimated Time: 45 mins</p>
          
            <h5>Career:</h5>
            <p>{doctorData.doctorEducation}</p>
        </div>
      </div>
    </div>
    <div className='primary-button'>
    <Button id="btn-1" variant="primary" onClick={appointment=()=> { bookAppointment(doctorData.doctorId, doctorData.doctorName)}}>Book Appointment</Button>
    </div>
    </>
  );
};

export default DoctorDetail;