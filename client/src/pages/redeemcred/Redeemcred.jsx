import React from "react";
import "./redeem.css";
import { useState } from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Redeemcred() {
  const { user, dispatch } = useContext(Context);
  const [cred, setCred] = useState(0);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  //HANDLING MODALS
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => {
    setShow(false);
    setShow2(true);
  };

  //CHECK ELIGIBILITY
  const checkeligibility = () => {
    if (user.credits < 300) {
      document.getElementById("cantredeem").style.display = "block";
    } else {
      document.getElementById("canredeem").style.display = "block";
    }
  };

  //ONLY NUMERIC INPUT
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCred(value);
  };

  //UPDATING CREDITS
  const updatecreds = async (e) => {
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      credits: user.credits - cred,
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
      <div className="container  py-4 my-4" style={{ width: "60%" }}>
        <div className="row">
          <div className="col text-center">
            <h3>What else can I do with these credits?</h3>
            <p className="lead">
              You can convert these credits into real money!
            </p>
            <p>
              {" "}
              <b>
                2 <i class="fas fa-coins" style={{ color: "orange" }}></i> ={" "}
                <i class="fas fa-rupee-sign"></i> 1
              </b>
              <br />
            </p>
            <span className="">
              Available credits: {user.credits}{" "}
              <i class="fas fa-coins" style={{ color: "orange" }}></i>
            </span>
            <br />

            <button
              className="my-4 px-4 py-1 bg-primary text-light"
              style={{ borderRadius: "15px", border: "none" }}
              onClick={checkeligibility}
            >
              Click here to check your eligbility to redeem
            </button>
            <br />
            <div
              id="cantredeem"
              className="container bg-light my-3 p-4"
              style={{ borderRadius: "10px", width: "70%" }}
            >
              <div className="row">
                <div className="col">
                  <i
                    class="far fa-times-circle px-2"
                    style={{ color: "red", fontSize: "1.5em" }}
                  ></i>{" "}
                  <span className="lead">
                    Sorry! you must have atleast 300{" "}
                    <i class="fas fa-coins" style={{ color: "orange" }}></i> in
                    your wallet.
                  </span>
                </div>
              </div>
            </div>

            <div
              id="canredeem"
              className=" container bg-light my-3 p-4"
              style={{ borderRadius: "10px", width: "70%" }}
            >
              <div className="row">
                <div className="col">
                  <i
                    class="far fa-check-circle px-2"
                    style={{ color: "green", fontSize: "1.5em" }}
                  ></i>
                  <span className="lead">Yay! You can redeem your credits</span>
                  <p className="my-3">
                    {" "}
                    Enter credits to be redeemed :
                    <input
                      className="mx-2"
                      style={{ width: "10%" }}
                      type="text"
                      value={cred}
                      onChange={handleChange}
                    />{" "}
                    (max : {user.credits})
                  </p>
                  Money you will receive : <i class="fas fa-rupee-sign"></i>{" "}
                  <b>{cred / 2}</b>
                  <br />
                  <button
                    className="mt-3 px-3 bg-secondary text-white"
                    style={{ border: "none", borderRadius: "15px" }}
                    onClick={handleShow}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Select mode of receiving payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleShow2}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2}>
          <Modal.Header>
            <Modal.Title>
              <i class="fas fa-check-circle" style={{ color: "green" }}></i>{" "}
              Request Successful
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Redeem request has been initiated. The amount{" "}
            <i class="fas fa-rupee-sign"></i> <b>{cred / 2}</b> will get
            credited in the selected mode in 2-3 days.
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
  );
}

export default Redeemcred;
