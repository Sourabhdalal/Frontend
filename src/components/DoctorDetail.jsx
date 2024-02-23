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
  const dcharges = location.state
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
  const bookAppointment = (did, dname, dcharges) => {
    // console.log(did);
    navigate('/patient/appointmentform', {state:[did,dname, dcharges]})
  }
  let appointment=()=>{}

  return (
    <>
    <div className="personal-info-container">

      <div className="profile-photo">
        <img
          src={doctorData.doctorePhoto==null ? profile : `${URL}/doctor/image/`+doctorData.doctorePhoto}
          alt="Profile"
          style={{ width: '100px', height: '100px',borderRadius:"50%",margin:"40px 20px",scale:"1.5" }}
        />
      </div>
      <div className="personal-details">
        <div className="column">
          <h2>{doctorData.doctorName}</h2>
          <h2>{doctorData.doctorEmail}</h2>
          <h2>{doctorData.doctorPhoneNumber}</h2>
          <h2>{doctorData.doctorEducation}</h2>
            
        </div>
        <div className="column">
        <h4>About:</h4>
            <p>{personalInfo.about}</p>
          <h4>Visiting Charges: {doctorData.doctorVisitingCharges}</h4>
         
            
            
        </div>
      </div>
    </div>
    <div className='primary-button'>
    <Button id="btn-1" variant="primary" onClick={appointment=()=> { bookAppointment(doctorData.doctorId, doctorData.doctorName, doctorData.doctorVisitingCharges)}}>Book Appointment</Button>
    </div>
    </>
  );
};

export default DoctorDetail;