import React, { useEffect, useState } from 'react'
import './PatientHomePage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorDetail from './DoctorDetail';
import { URL } from '../config';
import default_profile from '../assets/default_profile.png'

const PatientHomePage = () => {
    let [displayAllopathy, setDisplayAllopathy] = useState(true);
    let [displayAyurveda, setDisplayAyurveda] = useState(false);
    let [displayHomeopathy, setDisplayHomeopathy] = useState(false);
    let [doctorList, setDoctorList] = useState([{}])
    const navigate=useNavigate();
    let showAllopathy = () => {
        setDisplayAllopathy(true);
        setDisplayAyurveda(false);
        setDisplayHomeopathy(false);
    }

    let showAyurveda = () => {
        setDisplayAllopathy(false);
        setDisplayAyurveda(true);
        setDisplayHomeopathy(false); 
    }

    let showHomeopathy = () => {
        setDisplayAllopathy(false);
        setDisplayAyurveda(false);
        setDisplayHomeopathy(true);
    }

    useEffect(() => {
        const GetAllDoctor = async () => {
          try {
            const response = await axios.get(`${URL}/doctor/getDoctor`);
            setDoctorList(response.data)
             
          } catch (error) {
            console.error('Error fetching Doctor:', error);
          }
        };
        GetAllDoctor();
      }, []);

    const homeopathyList=doctorList.filter(e=>(e.doctorCategory=="Homeopathy"))
    const allopathyList=doctorList.filter(e=>(e.doctorCategory=="Allopathy"))
    const ayurvedaList=doctorList.filter(e=>(e.doctorCategory=="Ayurveda"))
    console.log(allopathyList);
   let DoctorDetails =(did)=>{
    console.log(did);
    navigate("/patient/doctordetail" ,{state:did})
   }
   let showDoctor = () => {}
    

  return (
    <div className='mt-4' style={{minHeight:"100vh"}}>
        <div className='d-flex justify-content-center'>
            <button className='custom-button' onClick={showAllopathy}>Allopathy</button>
            <button className='custom-button' onClick={showAyurveda}>Ayurveda</button>
            <button className='custom-button' onClick={showHomeopathy}>Homeopathy</button>
        </div>

        {displayAllopathy && allopathyList && 
         <div className='d-flex'>
            
            {allopathyList.map((a) => (
            <div className='d-flex row'> 
            <div className="card m-5 p-2"  style={{width:"20rem", height:"340px", borderRadius:"10px"}}>
                <img className="card-img-top" src={a.doctorePhoto==null ? default_profile : `${URL}/doctor/image/`+a.doctorePhoto} style={{width:"100%", height:"175px"}} />
                <div className="card-body">
                    <h5 className="card-title">{a.doctorName}</h5>
                    <p className="card-text">{a.doctorEducation}</p>
                    <btn className="btn btn-primary"
                        onClick={showDoctor = () => DoctorDetails(a.doctorId) }
                    >Show Details</btn>
                </div>
            </div>
            </div>))}
            
        </div>}
        
        {displayAyurveda && ayurvedaList && 
        <div className='d-flex'>
            
            {ayurvedaList.map((a) => (
            <div className='d-flex row'> 
            <div className="card m-5 p-2"  style={{width:"20rem", height:"340px", borderRadius:"10px"}}>
                <img className="card-img-top" src={a.doctorePhoto==null ? default_profile : `${URL}/doctor/image/`+a.doctorePhoto} style={{width:"100%", height:"175px"}} />
                <div className="card-body">
                    <h4>{a.doctorId}</h4>
                    <h5 className="card-title">{a.doctorName}</h5>
                    <p className="card-text">{a.doctorEducation}</p>
                    <btn className="btn btn-primary"
                     onClick={showDoctor = () => DoctorDetails(a.doctorId) }>Show Details</btn> 
                </div>
                </div>
            </div>))}
        </div>}
        
        
        {displayHomeopathy && homeopathyList &&
        <div className='d-flex'>
         
            {homeopathyList.map((a) => (
                <div className='d-flex row'>
                    <div className="card m-5 p-2"  style={{width:"20rem", height:"340px", borderRadius:"10px"}}>
                    <img className="card-img-top" src={a.doctorePhoto==null ? default_profile : `${URL}/doctor/image/`+a.doctorePhoto} style={{width:"100%", height:"175px"}} />
                    <div className="card-body">
                    <h5 className="card-title">{a.doctorName}</h5>
                    <p className="card-text">{a.doctorEducation}</p>
                    <btn className="btn btn-primary"
                        onClick={showDoctor = () => DoctorDetails(a.doctorId) }                    
                        >Show Details</btn>
                    </div>
                </div>
            </div>))}

        </div>}
  
    </div>
  )
}

export default PatientHomePage