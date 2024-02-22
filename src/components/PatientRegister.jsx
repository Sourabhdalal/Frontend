import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../config'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const PatientRegister = () => {
    const[emailId,setEmail]=useState("")
    const[name,setName]=useState("")
    const[phone,setPhone]=useState("")
    const[password,setPassword]=useState("")
    const[address,setAddress]=useState("")
    const navigate=useNavigate();

    function handleRegistration(e){
        e.preventDefault();
        if(name.length===0)
        {
          toast.warning("Please Enter The UserName")
        }
        else if(password.length===0){
          toast.warning("Please Enter The Password")
        }
        else if(!emailId.match("@gmail.com")){
          toast.warning("Email is not in correct format")
        }
        else if(emailId.length===0 || name.length===0 || phone.length===0 || address.length===0 ){
          toast.warning("Please fill up all Details")
        }
        else if((""+phone).length<10 || (""+phone).length>13 ){
          toast.warning("minimun number of digits should be 10 and maximum can be 13")
        }
        
        else{
          console.log(name,phone,emailId)
              const body={patientName:name,patientEmail:emailId,patientPhoneNumber:phone,password:password,patientAddress:address}
              try {
                axios.post(`${URL}/patient/`,body).then((response)=>{
                  console.log(response.data)
                  if(response.status===204){
                    toast.warning("Already Register")
                  }
                  else{
                    toast.success("Successfully Register")
                    navigate('/login')
                  }
                }).catch() 
              } catch (e) {
                
              }
        }
       };

  return (
    <div>
         <div className="container mt-5" style={{width:"700px" ,margin:"auto"}}>
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card">
              <div className="card-body mt-2 md-2">
                <h2 align="center" className="card-title">Register Patient</h2>
                <br></br>
                <form onSubmit={handleRegistration}>
                
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label"><b>Name:</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      pattern="^[A-Za-z\s]+$"
                      placeholder="abc"
                     value={name}
                     onInput={(e) => setName(e.target.value)}
                      // required
                    />
                   
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailId" className="form-label"><b>Email Address:</b></label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailId"
                      placeholder="abc@gmail.com"
                      value={emailId}
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      onInput={(e) => setEmail(e.target.value)}
                      // required
                    />
                  </div>
                    <div className="mb-3">
                    <label htmlFor="phone_no" className="form-label"><b>Phone No:</b></label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone_no"
                      placeholder="4578912345"
                      pattern="^\d{10}$"
                     value={phone}
                     onInput={(e) => setPhone(e.target.value)}
                      // required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label"><b>Password:</b></label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="************"
                      value={password}
                     
                      onInput={(e) => setPassword(e.target.value)}
                      // required
                    />
                  </div>
                 <div className="mb-3">
                    <label htmlFor="address" className="form-label"><b>Address:</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Pune, MH"
                      value={address}
                      onInput={(e) => setAddress(e.target.value)}
                      // required
                    />
                  </div>
                  
  
                  <div className="d-grid">
                    <input
                      type="submit"
                      className="btn btn-primary btn-lg"
                      value="Register"
                     />
                    
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientRegister