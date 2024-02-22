import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { URL } from '../config'

const DoctorHistory = () => {

    let doctorId=sessionStorage["doctorId"]
    const [modalShow, setModalShow] = useState(false);
    const [doctorHistory, setDoctorHistory]=useState([])
  
    const openModal = () => {}

    
  useEffect(() => {
    const GetDoctorHistory = async () => {
      try {
        const response = await axios.get(`${URL}/doctor/`+doctorId);
        setDoctorHistory(response.data.patients)
        console.log(response.data.patients)
      } catch (error) {
        console.error('Error fetching Doctor:', error);
      }
    };
    GetDoctorHistory();
  }, []);

  // doctorHistory.map((p) => {
  //   console.log(p.patientName)
  // })


  
  return (
    <>
    <div>
      {doctorHistory.map((p) => {
        return(
        <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Patient Name</th>
          <th scope="col">Patient Email</th>
          <th scope="col">Patient Address</th>
          <th scope="col">Date</th>
          {/* <th scope="col">Status</th> */}
        </tr>
      </thead>
      <tbody>
          <tr>
          <td>{p.patientName}</td>
          <td>{p.patientEmail}</td>
          <td>{p.patientAddress}</td>
          <td>{p.date}</td>
          {/* <td><Button className='mx-3' variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        Edit
      </Button></td> */}
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
    </>
  )
}

export default DoctorHistory