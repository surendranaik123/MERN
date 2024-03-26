import React from 'react'
import Navbar from '../components/Navbar'
import "../css/portfoilo.css"


    const Portfolio = () => {
  return (
    <div>
        <Navbar/>
        <div class="content1">
    <div class="text-and-button-container">
        <h2>Your Text Here</h2>
        <button>Button</button>
    </div>
</div>

       {/* <div className='content1 opacity-image1'>
        <div className='head'>Portfolio</div>
        <h3 className='text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</h3>
        <div className='buttonss' >
       <button className='buttons'>Hello</button>
       <button className='buttons'>Hi.....</button>
       </div>
        </div> */}
    </div>
  )
}

export default Portfolio