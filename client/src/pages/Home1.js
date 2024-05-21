import React from 'react';
import Navbar from '../components/Navbar';
import Slider from "react-slick";
import { CheckCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/model1.png";
import img2 from "../assets/1.png";
import img3 from "../assets/2.png";
import "../css/home.css"; // Ensure correct path to your CSS file

function Home1() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <div>
      <Navbar/>
      <div className='land_bg'>
        <Slider {...settings}>
          <div className="slide">
            <div className="dis">
              <div className="hero">
                <p className="para">Our Benefit</p>
                <h1 className="heading">
                  Helping others find a better way
                </h1>
                <div className="benefits">
                  <div className="benefit-item">
                    <CheckCircleOutlined icon={faBars} />
                    <h5>Long Life Sunglasses</h5>
                  </div>
                  <div className="benefit-item">
                    <CheckCircleOutlined icon={faBars} />
                    <h5>Created By Nature</h5>
                  </div>
                  <div className="benefit-item">
                    <CheckCircleOutlined icon={faBars} />
                    <h5>The Rest Behind</h5>
                  </div>
                </div>
                <button className="btn_shopnow">
                  Shop Now <ArrowRightOutlined icon={faBars} />
                </button>
              </div>
              <div className="image-container">
                <img className="home_img" src={img1} alt="presentation" />
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="dis">
              <div className="hero">
                <p className="para">Our Second Slide</p>
                <h1 className="heading">
                  Different Content
                </h1>
                {/* Add different content here */}
              </div>
              <div className="image-container">
                <img className="home_img" src={img2} alt="presentation" />
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="dis">
              <div className="hero">
                <p className="para">Our Third Slide</p>
                <h1 className="heading">
                  More Unique Content
                </h1>
                {/* Add different content here */}
              </div>
              <div className="image-container">
                <img className="home_img" src={img3} alt="presentation" />
              </div>
            </div>
          </div>

        </Slider>
      </div>
    </div>
  );
}

export default Home1;
