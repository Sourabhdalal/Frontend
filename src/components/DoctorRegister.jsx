import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../config'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DoctorRegister = () => {

    const getInitialCategory = () => {
      const value = "Allopathy";
      return value;
    };

    const[emailId,setEmail]=useState("")
    const[name,setName]=useState("")
    const[phone,setPhone]=useState("")
    const[password,setPassword]=useState("")
    const[education,setEducation]=useState("")
    const[charges,setCharges]=useState("")
    const[category, setCategory]=useState(getInitialCategory)
    const navigate=useNavigate();

    function handleChange(e){
      setCategory(e.target.value)
      // console.log(category)

    }
    function handleRegistration(e){
        e.preventDefault();
        if(name.length==0){
          toast.warning("Please Enter The UserName")
        }
        else if(!emailId.match("@gmail.com")){
          toast.warning("Email is not in correct format")
        }
        else if(password.length==0){
          toast.warning("Please Enter The Password")
        }
        else if((""+phone).length<10 || (""+phone).length>13 ){
          toast.warning("minimun number of digits should be 10 and maximum can be 13")
        }
        else if(emailId.length==0 || name.length==0 || phone.length==0 || education.length==0 ){
          toast.warning("Please fill up all Details")
        }
        
       /* else if((""+phone).length<10 || (""+phone).length>13 ){
          toast.warning("minimun number of digits should be 10 and maximum can be 13")
        }*/
        
        else{
          console.log(name,phone,emailId)
              const body={doctorName:name,doctorEmail:emailId,doctorPhoneNumber:phone,password:password,doctorEducation:education,doctorCategory:category, doctorVisitingCharges:charges}
              try {
                axios.post(`${URL}/doctor/`,body).then((response)=>{
                  console.log(response.data)
                  if(response.status==204){
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
         <div className="container mt-5" style={{width:"600px" ,margin:"auto"}}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body mt-2 md-2">
                <h2 align="center" className="card-title">Register Doctor</h2>
                <br></br>
                <form onSubmit={handleRegistration}>
                
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label"><b>Name:</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="abc"
                      value={name}
                      pattern="^[A-Za-z\s]+$"
                      onInput={(e) => setName(e.target.value)}
                      required
                    />
                   
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailId" className="form-label"><b>Email Address:</b></label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailId"
                      placeholder="abc@gmail.com"
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      value={emailId}
                      onInput={(e) => setEmail(e.target.value)}
                      required
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
                      minLength={10}
                      maxLength={10}
                      value={phone}
                      onInput={(e) => setPhone(e.target.value)}
                      required
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
                      required
                    />
                  </div>

                 <div className="mb-3">
                    <label htmlFor="address" className="form-label"><b>Education:</b></label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter Qualification"
                      pattern="^[A-Za-z\s]+$"
                      value={education}
                      onInput={(e) => setEducation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="charges" className="form-label"><b>Charges</b></label>
                    <input
                      type="number"
                      className="form-control"
                      id="charges"
                      placeholder="0000"
                      pattern="^\d{4}$"
                      minLength={0}
                      maxLength={5}
                      value={charges}
                      onInput={(e) => setCharges(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label"><b>Category:</b></label>
                    <select class="form-select" value={category} onChange={handleChange}>
                      <option value="Allopathy">Allopathy</option>
                      <option value="Ayurveda">Ayurveda</option>
                      <option value="Homeopathy">Homeopathy</option>
                    </select>
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

export default DoctorRegister