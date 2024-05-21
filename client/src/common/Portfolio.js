import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import img1 from "../assets/shoping1.png";
import img2 from "../assets/shoping2.png";
import '../css/display.css';
import Navbar from '../components/Navbar';

function Portfolio() {


  return (
    <div>
      <Navbar/>
     <div style={{display:"flex"}}>
     <motion.div style={{ marginRight: "20px" }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 1.0 }}
        >
          <img src={img1} alt="img1" style={{ height: "250px", width: "250px", marginLeft: "200px" }} />
        </motion.div>
     
        <motion.div style={{ marginRight: "20px" }}
          initial={{ opacity: 0, scale: 0, x: 900 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 1.0,delay: 3 }}
        >
          <img src={img2} alt="img2" style={{ height: "250px", width: "250px", marginLeft: "200px" }} />
      </motion.div>

      <motion.div style={{ marginRight: "20px" }}
          initial={{ opacity: 0, scale: 0, x: 500 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 1.0,delay: 5 }}
        >
          <img src={img1} alt="img2" style={{ height: "250px", width: "250px", marginLeft: "200px" }} />
      </motion.div>
      
  </div>
       
    </div>
  );
}


export default Portfolio