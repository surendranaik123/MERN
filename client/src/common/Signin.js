import React from "react";
import "../css/signin.css";
import Navbar from "../components/Navbar";
import img from "../assets/96030554.webp";
import { Link } from "react-router-dom";

function Signin() {
  return (
    <div className="main_back opacity-image" style={{ marginBottom: "0px" }}>
      <Navbar />

      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "100px", marginLeft: "250px" }}>
          <div className="signin_h4">Level up your fashion sense</div>
          <div>
            <form>
              <div className="signin_form1">
                <h4 className="signin_h5">Create an account?</h4>
                <button className="signin_btn" style={{marginLeft:"105px",marginTop:"70px"}}>Signin</button>
              </div>
            </form>
          </div>
        </div>

        <form>
          <div className="signin_form">
            <h3 className="signin_h3">Credential</h3>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="lable_name">
                Email address
              </label>
              <input
                type="email"
                className="form-control1"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="exampleInputPassword1"
                className="lable_name"
                style={{ marginTop: "-20px" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control1"
                id="exampleInputPassword1"
                placeholder=""
              />
            </div>
            <button className="signin_btn">Signin</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
