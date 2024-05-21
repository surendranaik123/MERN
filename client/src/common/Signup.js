import React from "react";
import "../css/signup.css";
import Navbar from "../components/Navbar";
import img from '../assets/96030554.webp'
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="main_back opacity-image1" style={{marginBottom:"0px"}}>
      <Navbar />
     <div className="signup_home1" style={{marginTop:"20px"}}>
       <div style={{width:"36%",textAlign:"center",marginRight:"170px"}}>
       <div style={{ width:"60%",margin:"20px"}}>
        <form style={{width:"70%",paddingLeft:"20%",paddingTop:"10px"}}>
          <h1 className='signup'>Create an account</h1>

          <div className="form-group">
            <input type="fname" className="form-control2" id="exampleInputPassword1" placeholder="FirstName" />
          </div>
          
          <div className="form-group">
            <input type="lname" className="form-control2" id="exampleInputPassword1" placeholder="LastName" />
          </div>

          <div className="form-group">
            <input type="email" className="form-control2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <input type="password" className="form-control2" id="exampleInputPassword1" placeholder="Password" />
          </div>

          <div className="form-group">
            <input type="password" className="form-control2" id="exampleInputPassword1" placeholder="Confirm Password" />
          </div>
           <div style={{display:"flex"}}>
          <div className="form-group">
            <input type="contact" className="form-control-contact" id="exampleInputPassword1" placeholder="Contact Info" />
          </div>

          <div className="form-group">
            <input type="address" className="form-control-contact1" id="exampleInputPassword1" placeholder="Enter OTP" />
          </div>
          </div>

           <div className="form-group form-check" style={{marginTop:"-10px",width:"130px"}}>
            <input type="checkbox" className="form-check-input" id="exampleCheck1" style={{border:"2px solied black"}} />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
              <div style={{ marginTop: "-10px",width:"500px",marginBottom:"10px"}}>
                already have an account?{" "}
                <Link to="/login" style={{ color: "blue" }}>
                  Sign in   
                </Link>
              </div>
          <button type="submit" className="signup_btn">Submit</button>
        </form>
      </div>
       </div>
       <div className="img_signup">
       
        <div className="signup_text">
        <h3 className="signup_h3">E-Com</h3>
        <p className="signup_p">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book. It has survived not only five 
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including versions of
           Lorem Ipsum.</p>
        </div>
       
       </div>
      
     </div>
    </div>
  );
}
