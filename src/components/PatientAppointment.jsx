import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../config';
import { toast } from 'react-toastify';
const PatientAppointment = () => {

  let patientId=sessionStorage["patientId"]
  const[patientAppointment, setPatientAppointment]=useState([])
  const[patientsData, setPatientsData]=useState([])
  const[doctorIdState, setDoctorIdState]=useState("")
  const[payment,setPayment]=useState(false)


  useEffect(() => {
    const GetPatientAppointment = async () => {
      try {
        const response = await axios.get(`${URL}/patient/`+patientId);
        setPatientAppointment(response.data)
        setDoctorIdState(response.data.doctorId)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Doctor:', error);
      }
    };
    GetPatientAppointment();
  }, []);

  useEffect(() => {
    const GetDoctorData = async() => {
      console.log(doctorIdState);
      try{
        let did = doctorIdState
        const response = await axios.get(`${URL}/doctor/`+did);
        setPatientAppointment(response.data)
        setPatientsData(response.data.patients)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Doctor:', error);
      }
    }
    GetDoctorData();
  }, [doctorIdState])

  console.log(patientAppointment);

  const handlePayment = () => {
    try {
      let did = doctorIdState
      console.log(did)
      axios.get(`${URL}/patient/paymentStatus/`+patientId+`/`+did).then((response)=>{
        setPayment(true)
        toast.success("Payment done")
      }).catch() 
    } catch (e) {
      
    }
  }

  // console.log(patientAppointment);
  return (
    <>
       <div style={{minHeight:"100vh"}}>
    {patientsData.map((p) => {
      return(

        // <div>{p.patientName}</div>

      <div className='m-3'>
    {patientAppointment.doctorId!=null && p.status!=false &&
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Doctor id</th>
          <th scope="col">Doctor Name</th>
          <th scope="col">Date</th>
          <th scope='col'>Time</th>
          <th scope="col">Fee</th>
          <th scope="col">Payment</th>

        </tr>
      </thead>
      <tbody>
          <tr>
          <td>{patientAppointment.doctorId}</td>
         <td>{patientAppointment.doctorName}</td>
          <td>{p.date}</td>
          <td>{p.time}</td>
           <td>{patientAppointment.doctorVisitingCharges}</td>
           <td>
             {patientAppointment.paymentStatus==true && <div>Paid</div>}
            {patientAppointment.paymentStatus==false && <input className='btn btn-primary' type="button" value="Pay" onClick={handlePayment}/>}
              
           </td>
         </tr>
      </tbody>
     </table>
}
  </div>
        )
      })}
      </div>
    </>

     
  )
}

export default PatientAppointment