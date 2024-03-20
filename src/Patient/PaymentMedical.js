import { useState } from "react";
import React from "react";
import jsPDF from "jspdf";
import './Payment.css'
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import { useNavigate ,useLocation} from "react-router-dom";
import axios from "axios";

function Payment() {

    const location = useLocation();
    const { patientData } = location.state || {};

    const navigate=useNavigate();
    const [patientname, setPatientname] = useState(patientData.patientName);
    const [appointmentdetails, setAppointmentdetails] = useState(patientData.typeofservices);
    const [date, setDate] = useState(patientData.bookingdate);
    const [slottime, setSlottime] = useState(patientData.slottime);
    const [amount, setAmount] = useState(patientData.amount);
    const [paymenttype, setPaymenttype] = useState('');
    const [cash, setCash] = useState('');
    const [card, setCard] = useState('');
    const [upi, setUpi] = useState('');
    const [cardnumber, setCardnumber] = useState('');
    const [nameoncard, setNameoncard] = useState('');
    const [cardexpiry, setCardexpiry] = useState('');
    const [cardcvv, setCardcvv] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const submit=async()=>
    {

  

    
        const pdf = new jsPDF();
        pdf.text("Slot Booking Receipt", 20, 20);
        pdf.text(`Patient Name: ${patientData.patientName}`, 20, 30);
        pdf.text(`Appointment Details: ${patientData.typeofservices}`, 20, 40);
        pdf.text(`Date: ${patientData.bookingdate}`, 20, 50);
        pdf.text(`Slot Time: ${patientData.slottime}`, 20, 60);
        pdf.text(`Amount: ${patientData.amount}`, 20, 70);
        pdf.save("slot_receipt.pdf");

        navigate('/');
    localStorage.clear();

    

}



    // const submit = async () => {
    //     const data = {
    //         patientname,
    //         appointmentdetails,
    //         date,
    //         slottime,
    //         amount,
    //         paymenttype,
    //     };
    //     try {
    //         const response = await axios.post('http://localhost:9082/api/payment', data);
    //         setPatientname('');
    //         setAppointmentdetails('');
    //         setDate('');
    //         setSlottime('');
    //         setPaymenttype('');
    //         setAmount('');
            
    //         const pdf = new jsPDF();
    //         pdf.text("Slot booking receipt", 80, 20);
    //         pdf.text("Thank you " + patientname + " for booking an appointment with us.", 20, 30);
    //         pdf.text("Here are your appointment details ", 20, 40);
    //         pdf.text("Type of appointment: " + appointmentdetails, 20, 50);
    //         pdf.text("Appointment time: " + slottime, 20, 60);
    //         pdf.text("Date: " + date, 20, 70);
    //         pdf.text("Amount: " + amount, 20, 80);
    //         pdf.text("Note: Be at the hospital at least 10 minutes ahead of your appointment time", 20, 90);
    //         pdf.save('slot_receipt.pdf');
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //     }
    // }
    




    return (
        <>
        <LandNav></LandNav>
            <div>
                <table>
                    <tr>
                        <td>Patient name :</td>
                        <td><input type="text" value={patientname} onChange={(e) => setPatientname(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Appointment details :</td>
                        <td><input type="text" value={appointmentdetails} onChange={(e) => setAppointmentdetails(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Date :</td>
                        <td><input type="text" value={date} onChange={(e) => setDate(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Slot time :</td>
                        <td><input type="text" value={slottime} onChange={(e) => setSlottime(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Amount :</td>
                        <td><input type="number" value={amount}></input></td>
                    </tr>
                    <tr>
                        <td>Payment method :</td>
                        <td>
                            <input type="text" value={paymenttype} onChange={(e) => setPaymenttype(e.target.value)} />
                            <label>
                                <input type="radio" value="cash" checked={selectedOption === 'cash'} onChange={handleOptionChange} />
                                Cash
                            </label>
                            <label>
                                <input type="radio" value="card" checked={selectedOption === 'card'} onChange={handleOptionChange} />
                                Card
                            </label>
                            <label>
                                <input type="radio" value="upi" checked={selectedOption === 'upi'} onChange={handleOptionChange} />
                                UPI
                            </label>
                        </td>
                        {selectedOption === 'card' && (
                            <div>
                                <p>card number :</p>
                                <input type="number" value={cardnumber} onChange={(e) => setCardnumber(e.target.value)} />
                                <p>name on card :</p>
                                <input type="text" value={nameoncard} onChange={(e) => setNameoncard(e.target.value)} />
                                <p>expiry date :</p>
                                <input type="date" value={cardexpiry} onChange={(e) => setCardexpiry(e.target.value)} />
                                <p>cvv :</p>
                                <input type="number" value={cardcvv} onChange={(e) => setCardcvv(e.target.value)} />
                            </div>
                        )}
                        {selectedOption === 'upi' && (
                            <div>
                                <p>Please scan the QR code and complete your payment</p>
                                <img src="qr_code.jpg"></img>
                            </div>
                        )}
                    </tr>
                </table>
                <button onClick={submit}>Paynow</button>
            </div>
            <FooterPage></FooterPage>
        </>
    );
}

export default Payment;
