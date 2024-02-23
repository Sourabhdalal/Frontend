import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../config'
import default_profile from '../assets/default_profile.png'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal } from 'react-bootstrap';

const PatientProfile = () => {
  const[patientData, setPatientData]=useState({})
  const [modalShow, setModalShow] = useState(false);
  const[email, setEmail]=useState("")
  const[address, setAddress]=useState("")
  const[mobile, setMobile]=useState("")
  const[image,setImage]=useState("")
  
  let pid = sessionStorage["patientId"]

  useEffect(() => {
    const GetAllPatient = async () => {
      try {
        const response = await axios.get(`${URL}/patient/`+pid);
        setPatientData(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Patient:', error);
      }
    };
    GetAllPatient();
  }, []);

  const updateProfile = () => {
    // e.preventDefault();
    console.log("hiiii");
    const body = {
      patientEmail:email,
      patientAddress: address,
      patientPhoneNumber: mobile
    }

    console.log(body);

    try {
      axios.put(`${URL}/patient/`+pid, body).then((response) => {
        const result = response.data
          console.log(response.data);
      }).catch()
    } catch (error) {
      
    }
  }

  const uploadImage = (event) => {
    const file=event.target.files[0];
    console.log(file);
    setImage(file);
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData);
    try {
      axios.post(`${URL}/patient/image/upload/`+pid, formData).then((response) => {
          // const result = response.data
          // console.log(response.data);
      }).catch()
    } catch (error) {
      console.log("Error caught");
    }
  }

  const handleSubmit =(event)=>{
    event.preventDefault();
  }

  
  return (
    <div>
    <div class="container my-3">
      
       <div class="row align-items-center">
        <div class="col-3">
        <div className="profile-photo">
        <img
          src={patientData.patientPhoto==null ? default_profile : `${URL}/patient/image/`+patientData.patientPhoto}
          alt="Profile"
          style={{ width: '100px', height: '100px',borderRadius:"50%",margin:"40px 20px",scale:"1.5" }}
        />
      </div>
        </div>
        <div class="col-4 sm-col-12">
        <h4>{patientData.patientName}</h4>
          <h4>{patientData.patientEmail}</h4>
          <h4>{patientData.patientPhoneNumber}</h4>
          <h4>{patientData.patientAddress}</h4>
        </div>
        <div class="col-5">
          <h3>Medical info</h3>
          <p>age: 24</p>
          <p>blood group: B+</p>
          <p>height: 172cm</p>
          <p>weight: 65kg</p>
          <p></p>
        </div>
      </div>
      

      {/* <Modal
      centered
      show={modalShow}
        onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
           <form>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="text" class="form-control" id="email" 
              placeholder="name@example.com" 
              defaultValue={patientData.patientEmail}
              name='patientEmail'
              onChange={(e) => setEmail(e.target.value)} 
              required
              />

              <label for="mobile">Mobile Number</label>
              <input type="text" class="form-control" id="mobile" 
              placeholder="mobile" 
              defaultValue={patientData.patientPhoneNumber}
              name='mobile'
              onChange={(e) => setMobile(e.target.value)}
              required
              />

              <label for="address">address</label>
              <input type="text" class="form-control" id="address" 
              placeholder="address" 
              defaultValue={patientData.patientAddress}
              name='address'
              onChange={(e) => setAddress(e.target.value)}
              required
              />

                <div className="text-center mt-2"> 
                  <button className="btn btn-primary" onClick={updateProfile} >edit</button>
                </div>
            </div>
            </form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal> */}

    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <input type="file" onChange={uploadImage} />
    </form>
    

    {/* <Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        Edit
      </Button>  */}
    </div>
    </div>
  )
}

export default PatientProfile