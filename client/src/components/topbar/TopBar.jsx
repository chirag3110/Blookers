import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import icon from "../../logo.png"

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  //const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft px-5">
        <img src={icon} alt="wow" height="40" width="40" />
        <span className="px-2" style={{ fontSize: "1.5em", marginTop: "5px" }}>
          Blookers
        </span>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <div>
            <Link to="/settings" style={{ textDecorationLine: "none" }}>
              <span className="px-2 link" style={{ fontSize: "20px",color:"black" }}>
                Hello, {user.username}
              </span>
            </Link>
            <div class="dropdown">
            <span className=" link dropbtn" >
              {user.credits}{" "}
              <i class="fas fa-coins" style={{ color: "orange" }}></i> credits
            </span>
            <div class="dropdown-content">
                <Link  className="a" to="/redeem">Redeem Credits</Link>
                <Link  className="a" to="/add">Add more Credits</Link>
              </div>
            </div>
              
            
          </div>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
