import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { URL } from '../config'

const PatientHistory = () => {
  let patientId=sessionStorage["patientId"]

  const [modalShow, setModalShow] = useState(false);
  const[patientHistory, setPatientHistory]=useState([])
  const[doctorData, setDoctorData]=useState([])
  const[getPrescription, setGetPrescription]=useState([])
  const openModal = () => {}

  useEffect(() => {
    const GetPatientHistory = async () => {
      try {
        const response = await axios.get(`${URL}/patient/`+patientId);
        console.log(response.data);
        setPatientHistory(response.data)
        setDoctorData(response.data.doctorId)
      } catch (error) {
        console.error('Error fetching Doctor:', error);
      }
    };
    GetPatientHistory();
  }, []);

  // console.log(doctorData);

  useEffect(() => {
    const GetDoctorData = async() => {
      try{
        let did = doctorData
        console.log(did);
        const response = await axios.get(`${URL}/doctor/`+did);
        setDoctorData(response.data)
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching Doctor:', error);
      }
    }
    GetDoctorData();
  }, [doctorData])

  useEffect(() => {
    const GetPrescription = async() => {
      try{
        let did = doctorData.doctorId
        console.log(did);
        const response = await axios.get(`${URL}/prescription/get/`+did+`/`+patientId);
        setGetPrescription(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Doctor:', error);
      }
    }
    GetPrescription();
  }, [doctorData])

  return (
    <div style={{minHeight:"100vh"}}>
       <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Doctor email</th>
          <th scope="col">Doctor Name</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Fee</th>
          <th scope='col'>Status</th>
        </tr>
      </thead>
      <tbody>
          <tr>
          <td>raj@gmail.com</td>
          <td>raj</td>
          <td>2024-02-19</td>
          <td>13:40</td>
          <td>400</td>
          <td><Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
        view prescription
      </Button> </td>
        </tr>
        <tr>
          <td>yash@gmail.com</td>
          <td>yash</td>
          <td>2034-02-20</td>
          <td>03:30</td>
          <td>500</td>
          <td><Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
            view prescription
      </Button> </td>
        </tr>

        <tr>
          <td>{doctorData.doctorEmail}</td>
          <td>{doctorData.doctorName}</td>
          <td>{patientHistory.date}</td>
          <td>{patientHistory.time}</td>
          <td>{doctorData.doctorVisitingCharges}</td>
          <td><Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
        
        view prescription
      </Button> </td>
        </tr>
          
      </tbody>
    </table>

    <Modal
      centered
      show={modalShow}
        onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>View Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
          <div>
            <h3>Diseases: {getPrescription.dieases}</h3>
            </div>
            <div>
            <h3>Tablet: {getPrescription.tablet}</h3>
          </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default PatientHistory