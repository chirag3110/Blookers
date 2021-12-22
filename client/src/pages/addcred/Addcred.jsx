import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Context } from "../../context/Context";
import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Addcred() {

    const { user, dispatch } = useContext(Context);
    const [show,setShow]=useState(false);
    const [cred, setCred] = useState(0);

    const handleChange = (e) =>{
        const value= e.target.value.replace(/\D/g, "");
        setCred(value);
    }
    const handleShow = () => setShow(true);

    const updatecreds = async (e) => {
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
          userId: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
          credits: user.credits + Number(cred),
        };
        try {
          const res = await axios.put("/users/" + user._id, updatedUser);
          //setSuccess(true);
          console.log("success");
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
          dispatch({ type: "UPDATE_FAILURE" });
        }
      };

    return (
        <>
        <h3 className='mt-5 text-center'>Out of Credits? Don't worry you can add more.</h3>
        <p className='lead text-center'>Maximum no. of credits you can add at a time is limited to <b>500</b></p>
        <div className="container mt-5 bg-light p-4 text-center" style={{width:"40%"}}>
            <div className="row">
                <div className="col text-center">
                    <p>
                        No. of credits to be added : 
                        <input className="mx-2"type="text" value={cred} onChange={handleChange} style={{width:"10%"}}/>
                    </p>
                    Amount to be paid for {cred} <i class="fas fa-coins" style={{ color: "orange" }}></i> = <b><i class="fas fa-rupee-sign"></i> {cred/2}</b><br/>
                    <p className='mt-4 text-left'>Select payment mode</p>
                    <div className="row">
              <div className="col">
                <input type="radio" id="paytm" name="payment_mode" />
                <label className="px-2" for="paytm">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png"
                    height="20"
                    width="60"
                    alt="paytm"
                  />
                </label>
              </div>
              <div className="col">
                <input type="radio" id="bank" name="payment_mode" />
                <label className="px-2" for="bank">
                  {" "}
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/bank-1850789-1571030.png"
                    height="30"
                    width="30"
                    alt="bank"
                  />{" "}
                  Bank{" "}
                </label>
              </div>
              <div className="col">
                <input type="radio" id="amazon" name="payment_mode" />
                <label className="px-2" for="amazon">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Amazon_Pay_logo.svg/1280px-Amazon_Pay_logo.svg.png" height="20" weight="20" alt=""/>
                </label>
              </div>
            </div>
                </div>
            </div>
            <Button variant="primary"className='mt-5' onClick={handleShow}>Proceed</Button>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title><i class="fas fa-check-circle" style={{ color: "green" }}></i> Payment Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Payment has been received. {cred} <i class="fas fa-coins" style={{ color: "orange" }}></i> have been added to your wallet!
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={updatecreds}>
              <Link
                to="/"
                className="link text-white"
                style={{ textDecorationLine: "none" }}
              >
                Okay
              </Link>
            </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>
    )
}

export default Addcred