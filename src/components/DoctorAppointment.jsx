import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../config';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
const DoctorAppointment = () => {

  const[doctorAppointment, setDoctorAppointment]=useState([])
  const [modalShow, setModalShow] = useState(false);
  const[diseases,setDiseases]=useState("")
  const[tablet,setTablet]=useState("")

  let doctorId=sessionStorage["doctorId"]
  const openModal = () => {}

  useEffect(() => {
    const GetDoctorAppointment = async () => {
      try {
        const response = await axios.get(`${URL}/doctor/`+doctorId);
        setDoctorAppointment(response.data.patients)
        console.log(response.data.patients)
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };
    GetDoctorAppointment();
  }, []);

//   useEffect(() => {
//     const GetPatientData = async() => {
//       try{
//         let patientId=doctorAppointment.patientId
//         const response = await axios.get(`${URL}/patient/`+patientId);
//         setPatientAppointment(response.data)
//         // console.log(response.data)
//       } catch (error) {
//         console.error('Error fetching patient:', error);
//       }
//     }
//     GetPatientData();
//   }, [])

console.log(doctorAppointment);

  let patientId=doctorAppointment.map((p)=>(p.patientId))
  // console.log(patientId);

  const handlePrescription = () => {
    const body = {
      dieases:diseases,
      tablet
    }
    try {
      axios.post(`${URL}/prescription/generate/`+doctorId+`/`+patientId, body).then((response) => {
        const result = response.data
          console.log(response.data);
      }).catch()
    } catch (error) {
      
    }

  }

  return (
    <div className='m-3' style={{minHeight:"100vh"}}>
      {doctorAppointment.length ==0 && 
      <div style={{display:"flex", justifyContent:"center"}}>
        <h2>No Appointment schedule</h2>
      </div>
      }
      {doctorAppointment.map((d) => {

        return(
          <table className="table table-hover table-bordered">
          <thead>
        <tr>
          <th scope="col">patient Name</th>
          <th scope="col">patient Email</th>
          <th scope='col'>patient Address</th>
          <th scope='col'>Date</th>
          <th scope="col">Time</th>
          <th scope='col'>Status</th>
        </tr>
      </thead>
      <tbody>
          <tr>
          <td>{d.patientEmail}</td>
          <td>{d.patientName}</td>
          <td>{d.patientAddress}</td>
          <td>{d.date}</td>
          <td>{d.time}</td>
          <td>
            {d.prescriptionStatus == false && 
            <Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
            Prescription
            </Button>
            }
            {
              d.prescriptionStatus==true && 
              <h6>Prescription generated</h6>
            }
            
          </td>
        </tr>
      </tbody>
    </table>
          )
    })}
     
    <Modal
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
              <label for="diseases">Diseases</label>
              <input type="text" class="form-control" id="diseases" 
              placeholder="Enter Disease" 
              name='diseases'
              onChange={(e) => setDiseases(e.target.value)} 
              required
              />

              <label for="tablet">Tablet</label>
              <input type="text" class="form-control" id="tablet" 
              placeholder="tablet" 
              name='tablet'
              onChange={(e) => setTablet(e.target.value)}
              required
              />

                <div className="text-center mt-2"> 
                  <button className="btn btn-primary" onClick={handlePrescription} >Generate Prescription</button>
                </div>
            </div>
            </form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>

  </div>
  )
}

export default DoctorAppointment