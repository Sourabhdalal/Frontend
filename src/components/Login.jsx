import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {URL} from '../config'
import { toast } from 'react-toastify';


const Login = () => {
    const[userName,setUserName]=useState("");
    const [password, setPassword] = useState("");
    const [userLogin, setUserLogin] = useState("");
    const navigate = useNavigate();

    const Login = (e) => {
        e.preventDefault();
        console.log(userName)
        console.log(password)

        const body = {
          userName,
          password
        }
        

        try{
          axios.post(`${URL}/login/`+userName+`/`+password, body).then((response) => {
            const result = response.data
              console.log(response.data);
              const {id, name, education} = result
              if (response.status===200) {

                
                if(education == null){
                  sessionStorage['name'] = name;
                  sessionStorage['patientId'] = id
                  navigate('/patient/home')
              }else{
                sessionStorage['name'] = name;
                sessionStorage['doctorId'] = id
                navigate('/doctor/home')
              }
         
             
            }else{
              navigate('/login')
            }
            
          })
          .catch((error)=>{
            // alert("Wrong credentials")
            toast.warning("wrong credentials")
          }) 
          { 
           //toast.warning('Wrong credential')
          navigate('/login')  
        }}catch(e){
          // toast.warning('Wrong credential')
        }
    }
  return (
    <div>
        
        <div className="container mt-4 " style={{width:"600px" ,margin:"auto" ,marginTop:"20px",marginBottom:"20px"}} >
      <div className="row justify-content-center ">
        <div className="col-md-6">
          {/* <div className="card box"> */}
            <div className="card-body box">
              <form className="login-form">
                <h2 className="text-center login-heading">Login</h2>
                <div className="form-group">
                 <b> <label htmlFor="email" className="font-weight-bold">Email:</label></b>
                 
                  <input
                    type="email"
                    className="form-control"
                    placeholder="abc@gmail.com"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                <b> <label htmlFor="password" className="font-weight-bold">Password:</label></b>
                  
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="**********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                  required
                  />
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn-primary" onClick={Login}>Login</button>
                </div>
                <br />
                {/* <div className="text-center mt-3">
                  <a href="/forgetpassword" className="forgot-password-link">
                    Forgot Password?
                  </a>
                </div> */}
                <p className="text-center mt-2 new-user">
                  New user? <a href="/register/patient">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
    
    </div>
  )
}

export default Login