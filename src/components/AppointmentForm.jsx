import axios from 'axios';
import React, { useState } from 'react'
// import "bootstrap/dist/css/bootstrap.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { URL } from '../config';

function AppointmentForm() {

    const location=useLocation()
    const doctorId=location.state[0]
    const doctorName=location.state[1]

    const navigate=useNavigate()

    const[date, setDate]=useState(new Date().toLocaleDateString())
    const[time, setTime]=useState("")
    const[cough, setCough]=useState(false)
    const[cold, setCold]=useState(false)
    const[fever, setFever]=useState(false)
    const[checkUp, setCheckUp]=useState(false)

    const formSubmit=(e)=>{
      e.preventDefault();
      
      const body = {date, time, cough, fever, cold, checkUp}
      console.log(body);

      let patientId = parseInt(sessionStorage["patientId"])
      console.log(patientId);
      
      try{
        axios.post(`${URL}/patient/checkUp/`+patientId+`/`+doctorId, body).then((response) => {
            console.log(response);
            console.log("booked appt");
            navigate('/patient/home')
        })
        .catch() 
        { 
         //toast.warning('Wrong credential')
        // navigate('/home')  
      }
          
      }catch(error){
        console.error("something happened")
      }

    }

  return (
    <>
    <div className="container my-2">
    <h2>Appointment form</h2>
    <form action="/action_page.php" onSubmit={formSubmit}>
    <div className="mt-3 w-50">
      <label for="dname">Doctor Name:</label>
      <input type="text" className="form-control" id="dname" value={doctorName} name="dname" readonly />
    </div>
    <div className="mb-3 w-50">
      <label for="fee">Visting Fee:</label>
      <input type="text" className="form-control" id="fee" name="fee" value="400" readonly />
    </div>

    <div className="mb-3 w-50">
      <label for="date">Date</label>
      <input type="date" className="form-control" id="date" name="date"
      onInput={(date) => {
        const dateString = new Date(date).toLocaleDateString()
        console.log(dateString)
      }}
      />
    </div>

    <div className="mb-3 w-50">
      <label for="time">Time</label>
      <input type="time" className="form-control" id="time" name="time" 
      onInput={e => setTime(time)} />
    </div>
   
    <div className="form-check mb-3 w-50">
        <input className="form-check-input" type="checkbox" name="Cough" value={cough} 
        oncheck={e => setCough(!cough)} /> 
      <label className="form-check-label"> Cough
      </label> 
      </div>

      
      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" name="Cold" value={cold}  
        onCheck={e => setCold(!cold)} /> 
       <label className="form-check-label"> Cold
      </label>
      </div>
      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" name="Fever" value={fever} 
        onCheck={e => setFever(!fever)} /> 
       <label className="form-check-label"> Fever
      </label> 
      </div>
      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" name="CheckUp" value={checkUp}
        onCheck={e => setCheckUp(!checkUp)} /> 
       <label className="form-check-label"> check-up
      </label>
    </div>
    <input type="submit" className="btn btn-primary" value="Submit"/>
  </form>
  </div>
  </>
  )
}

export default AppointmentForm