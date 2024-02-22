import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../config'
import default_profile from '../assets/default_profile.png'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal } from 'react-bootstrap';

const DoctorProfile = () => {
  const[doctorData, setDoctorData]=useState({})
  const [modalShow, setModalShow] = useState(false);
  const[email, setEmail]=useState("")
  const[education, setEducation]=useState("")
  const[mobile, setMobile]=useState("")
  const[charges,setCharges]=useState("")
  const[age,setAge]=useState("")
  const[height,setHeight]=useState("")
  const[weight,setWeight]=useState("")
  const[bloodGroup,setBloodGroup]=useState("")
  const[image,setImage]=useState("")
  
  let dId = sessionStorage["doctorId"]

  useEffect(() => {
    const GetAllDoctor = async () => {
      try {
        const response = await axios.get(`${URL}/doctor/`+dId);
        setDoctorData(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Doctor:', error);
      }
    };
    GetAllDoctor();
  }, []);



 


  const uploadImage = (event) => {
    const file=event.target.files[0];
    console.log(file);
    setImage(file);
    const formData = new FormData();
    formData.append('image', file);

    try {
      axios.post(`${URL}/doctor/image/upload/`+dId, formData).then((response) => {
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

  const updateProfile = () => {
    // e.preventDefault();
    console.log("hiiii");
    const body = {
      doctorEmail:email,
      doctorEducation: education,
      doctorPhoneNumber: mobile,
      doctorVisitingCharges:charges,
      doctorAge:age,
      doctorHeight:height,
      doctorWeight:weight,
      doctorBloodGroup:bloodGroup
    }

    console.log(body);

    try {
      axios.put(`${URL}/doctor/`+dId, body).then((response) => {
        const result = response.data
          console.log(response.data);
      }).catch()
    } catch (error) {
      
    }
  }

// console.log(patientData);
  return (
    <div>
    <div class="container my-3">
      
       <div class="row align-items-center">
        <div class="col-3">
        <div className="profile-photo">
        <img
          src={`${URL}/doctor/image/`+doctorData.doctorePhoto}
          alt="Profile"
          style={{ width: '100px', height: '100px',borderRadius:"50%",margin:"40px 20px",scale:"1.5" }}
        />
      </div>
        </div>
        <div class="col-4 sm-col-12">
          <h4>{doctorData.doctorName}</h4>
          <p>Email:{doctorData.doctorEmail}</p>
          <p>Mobile:{doctorData.doctorPhoneNumber}</p>
          <p>Qualification:{doctorData.doctorEducation}</p>
          <p>Charges:{doctorData.doctorVisitingCharges}</p>
        </div>
        <div class="col-5 sm-col-12">
          <p>Age:{doctorData.doctorAge}</p>
          <p>Height: {doctorData.doctorHeight}</p>
          <p>Blood group: {doctorData.doctorBloodGroup}</p>
          <p>Weight: {doctorData.doctorWeight}</p>
          <p></p>
        </div>
      </div>
      

      <Modal
      centered
      show={modalShow}
        onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
           <form>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="text" class="form-control" id="email" 
              placeholder="name@example.com" 
              defaultValue={doctorData.doctorEmail}
              name='doctorEmail'
              onChange={(e) => setEmail(e.target.value)} 
              required
              />

              <label for="mobile">Mobile Number</label>
              <input type="text" class="form-control" id="mobile" 
              placeholder="mobile" 
              defaultValue={doctorData.doctorPhoneNumber}
              name='doctormobile'
              onChange={(e) => setMobile(e.target.value)}
              required
              />

              <label for="address">Education</label>
              <input type="text" class="form-control" id="address" 
              placeholder="Education" 
              defaultValue={doctorData.doctorEducation}
              name='education'
              onChange={(e) => setEducation(e.target.value)}
              required
              />

            <label for="address">Charges</label>
              <input type="text" class="form-control" id="address" 
              placeholder="charges" 
              defaultValue={doctorData.doctorVisitingCharges}
              name='charges'
              onChange={(e) => setCharges(e.target.value)}
              required
              />

             <label for="Age">Age</label>
              <input type="number" class="form-control" id="age" 
              placeholder="Age" 
              defaultValue={doctorData.doctorAge}
              name='age'
              onChange={(e) => setAge(e.target.value)}
              required
              />

            <label for="Height">Height</label>
              <input type="number" class="form-control" id="height" 
              placeholder="height" 
              defaultValue={doctorData.doctorHeight}
              name='height'
              onChange={(e) => setHeight(e.target.value)}
              required
              />

            <label for="Weight">Weight</label>
              <input type="number" class="form-control" id="weight" 
              placeholder="weight" 
              defaultValue={doctorData.doctorWeight}
              name='weight'
              onChange={(e) => setWeight(e.target.value)}
              required
              />


            <label for="BloodGroup">Blood Group</label>
              <input type="text" class="form-control" id="bloodGroup" 
              placeholder="bloodGroup" 
              defaultValue={doctorData.doctorBloodGroup}
              name='Blood Group'
              onChange={(e) => setBloodGroup(e.target.value)}
              required
              />

                <div className="text-center mt-2"> 
                  <button className="btn btn-primary" onClick={updateProfile} >updateProfile</button>
                </div>
            </div>
            </form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>


    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <input type="file" onChange={uploadImage} />
    </form>
    

    <Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        Edit
      </Button> 
      
    </div>
    </div>
  )
}

export default DoctorProfile