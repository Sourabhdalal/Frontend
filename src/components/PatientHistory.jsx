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

  // console.log(typeof(doctorData));

  useEffect(() => {
    const GetDoctorData = async() => {
      try{
        let did = doctorData
        console.log(did);
        // const response = await axios.get(`${URL}/doctor/`+did);
        // setDoctorData(response.data)
        // console.log(response.data)
      } catch (error) {
        // console.error('Error fetching Doctor:', error);
      }
    }
    GetDoctorData();
  }, [doctorData])

  return (
    <div>
       <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Doctor id</th>
          <th scope="col">Doctor Name</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Fee</th>
          <th scope='col'>Status</th>
        </tr>
      </thead>
      <tbody>
          <tr>
          <td>23</td>
          <td>abcd</td>
          <td>2024-02-19</td>
          <td>13:40</td>
          <td>400</td>
          <td><Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        Edit
      </Button> </td>
        </tr>
        <tr>
          <td>24</td>
          <td>defg</td>
          <td>2034-02-20</td>
          <td>03:30</td>
          <td>500</td>
          <td><Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        Edit
      </Button> </td>
        </tr>

        <tr>
          <td>{doctorData.doctorId}</td>
          <td>{doctorData.doctorName}</td>
          <td>{patientHistory.date}</td>
          <td>{patientHistory.time}</td>
          <td>{doctorData.doctorCharges}</td>
          <td><Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        Edit
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
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
          <p>
            abcd
          </p>
      </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default PatientHistory