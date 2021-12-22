import "./post.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Post({ post }) {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //UPDATING CREDITS
  const updatecreds = async (e) => {
    //USER'S CREDS
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      credits: user.credits - 5,
    };
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      //setSuccess(true);
      console.log("success");
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }

    //UPDATING BLOG OWNERS CREDITS
    const owner_data = await axios.get("/users/?user=" + post.username);
    const owner = owner_data.data;

    dispatch({ type: "UPDATE_START" });
    const updatedowner = {
      userId: owner._id,
      username: owner.username,
      email: owner.email,
      password: owner.password,
      credits: owner.credits + 5,
    };
    try {
      await axios.put("/users/" + owner._id, updatedowner);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="post py-2">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <span className="postTitle">{post.title}</span>
        <hr />
        <span className="my-2">
          Author :{" "}
          <i>
            <b>{post.username}</b>
          </i>
        </span>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
      <div className="text-center">
        <button
          className="px-3"
          style={{ fontSize: "15px", borderRadius: "20px" }}
          onClick={handleShow}
        >
          Click to read full blog
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Take me to the BLOG!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to spend 5{" "}
            <i class="fas fa-coins" style={{ color: "orange" }}></i> credits?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No, thanks
            </Button>
            <Button variant="primary" onClick={updatecreds}>
              <Link
                to={`/post/${post._id}`}
                className="link text-white"
                style={{ textDecorationLine: "none" }}
              >
                Proceed
              </Link>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
