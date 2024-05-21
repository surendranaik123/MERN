import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Carousel, Dropdown, message, Space } from "antd";
import { Input } from "antd";

import { shuffle } from "lodash";

import img1 from "../assets/shoping1.png";
import img2 from "../assets/shoping2.png";
import img3 from "../assets/shoping3.png";
import Rating from "react-rating-stars-component";

import "../css/display.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { CheckCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { motion } from 'framer-motion';


const Landing = () => {
  const { Search } = Input;
  const location = useLocation();
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const navigate = useNavigate();
  const [productsToShow, setProductsToShow] = useState(10);
  // const [rating, setRating] = useState([0, 0, 0, 0, 0]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(data);
  const [product, setProduct] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [searchProduct, setSearchProduct] = useState([]);

  console.log(product, Loading);
  useEffect(() => {
    axios
      .get("https://mern-0ycy.onrender.com/api/v1/productdata")
      .then((res) => {
        console.log("API Response:", res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const items = [
    {
      label: (
        <h5 className="btn1" onClick={() => filterProduct("")}>
          All Products
        </h5>
      ),
      key: "All Products",
    },
    {
      label: (
        <h5 className="btn1" onClick={() => filterProduct("men's clothing")}>
          Men's Clothing
        </h5>
      ),
      key: "Mens Clothing",
    },
    {
      label: (
        <h5 className="btn1" onClick={() => filterProduct("women's clothing")}>
          Women's Clothing
        </h5>
      ),
      key: "Womens Clothing",
    },
    {
      label: (
        <h5 className="btn1" onClick={() => filterProduct("jewelery")}>
          Jewelry
        </h5>
      ),
      key: "Jewelry",
    },
    {
      label: (
        <h5 className="btn1" onClick={() => filterProduct("electronics")}>
          Electronic
        </h5>
      ),
      key: "Electronic",
    },
  ];

  const App = () => (
    <Dropdown menu={{ items, onClick }}>
      <button onClick={(e) => e.preventDefault()}>
        <Space>
          <button className="btn1">
            Click menu item
            <DownOutlined />
          </button>
        </Space>
      </button>
    </Dropdown>
  );
  console.log(App);
  useEffect(() => {
    // Fetch product data from API
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log("API Response:", res.data);
        // Shuffle the data randomly
        const shuffledData = shuffle(res.data);
        setData(shuffledData);
        setPerpage(shuffledData.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  useEffect(() => {
    // Update products per page when category, data, or searchCategory changes
    const offset = currentPage * 4;
    let filteredData = data;

    if (currentCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === currentCategory
      );
    }

    if (searchCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === searchCategory
      );
    }

    setPerpage(filteredData.slice(offset, offset + 4));
  }, [currentCategory, data, currentPage, searchCategory]);

  const filterProduct = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage(0); // Reset to the first page when applying filter
  };

  const onSearch = (cat) => {
    // Check if any product matches the searched category
    const isProductAvailable = data.some(item => item.category === cat);
  
    if (!isProductAvailable) {
      setSearchProduct("Product is not Available");
      setSearchCategory(""); // Reset search category
    } else {
      setSearchProduct("");
      setSearchCategory(cat);
    }
  
    setCurrentPage(0); // Reset to first page when applying filter
  };
  
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const Product1 = () => {
    return (
      <>
        <div className="back1">
          <div className="display">
            <div className="home1">
              {perpage.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: "2px solid black",
                    margin: "20px",
                    height: "auto",
                    paddingBottom: "20px",
                    width:"280px"
                  }}
                >
                  <img
                    src={product.image}
                    className="prodduct_img"
                    alt="presentation"
                    // alt={`Product: ${product.title}`}
                  />

                  <h5 className="category">
                    {product.category}
                  </h5>
                  <div style={{ display: "flex" }}>
                    <h5 className="prices">
                      Price:${product.price}
                    </h5>
                    <h5
                      style={{
                        marginLeft: "30px",
                        marginBottom: "30px",
                        fontSize: "1.1rem",
                        marginTop: "5px",
                      }}
                    >
                      <Rating
                        count={5}
                        value={product.rating.rate}
                        size={24}
                        activeColor="green"
                      />
                    </h5>
                  </div>

                  <div style={{ marginTop: "-30px", marginLeft: "40px" }}>
                    {isAuthenticated ? (
                      <>
                        <NavLink to={`/product/${product.id}`}>
                          <button className="add">Add To Cart</button>
                        </NavLink>
                        <NavLink
                          to={`/order/${product.id}`}
                          state={{ UserEmail: location.state?.id }}
                        >
                          <button className="buynow">Buy Now</button>
                        </NavLink>
                      </>
                    ) : (
                      <NavLink to={`/product/${product.id}`}>
                        <button className="add">Add To Cart</button>
                      </NavLink>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "70px" }}>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(
                  (currentCategory
                    ? data.filter((item) => item.category === currentCategory)
                    : data
                  ).length / 4
                )}
                marginPagesDisplayed={1}
                pageRangeDisplayed={10}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>

          </div>
        </div>
      </>
    );
  };

  const ProductAll = ({ data }) => {
    const loadMoreProducts = () => {
      setProductsToShow(data.length);
    };

    return (
      <>
        <div style={{ backgroundColor: "lightgray", padding: "40px" }}>
          <div  style={{ display: "flex" }}>
            <h3>New Arrival</h3>

            {productsToShow < data.length && (
              <h5 className="arrived" onClick={loadMoreProducts}>View More 
              <i className="bi bi-arrow-right"></i>
              </h5>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            {data.slice(0, productsToShow).map ((product) => (
              <div key={product.id} style={{ margin: "10px" }}>
                <img
                  src={product.image}
                  className="prodduct_img"
                  alt="presentation"
                />
                <h5
                  style={{
                    marginLeft: "10px",
                    marginTop: "-10px",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {product.category}
                </h5>
                <h6
                  style={{
                    marginLeft: "10px",
                    marginBottom: "20px",
                    display: "flex",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {" "}
                    Price:{" "}
                  </div>{" "}
                  <div style={{ fontSize: "1.2rem", color: "blue" }}>
                    ${product.price}
                  </div>
                </h6>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const handleProducts = () => {
    navigate("/productdata");
  };


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
    <>
      <Navbar />

      <div className='land_bg'>
        <Slider {...settings}>
          <div className="slide">
            <div className="dis">
              <div className="hero">
                <p className="para">Our Benefit</p>
                <h1 className="heading">
                  Helping others find a better way
                </h1>

                <div className="benefits" style={{display:"flex",marginLeft:"300px",marginTop:"20px"}}>
                  <div className="benefit-item" style={{display:"flex",marginRight:"40px"}}>
                    <CheckCircleOutlined icon={faBars}  style={{fontSize:"1.4rem",marginRight:"5px"}}/>
                    <h5>Long Life T-Shirts</h5>
                  </div>
                  <div className="benefit-item">
                    <CheckCircleOutlined icon={faBars}  style={{fontSize:"1.4rem",marginRight:"5px"}}/>
                    <h5>Created By Nature</h5>
                  </div>
                  <div className="benefit-item">
                    <CheckCircleOutlined icon={faBars}  style={{fontSize:"1.4rem",marginRight:"5px"}}/>
                    <h5>The Rest Behind</h5>
                  </div>
                </div>
                <div className="btn-container">
                <button className="btn_shopnow ">
                  Shop Now <ArrowRightOutlined icon={faBars} />
                </button>
                </div>
              </div>
              <div className="image-container">
                <img className="home_img" src={img1} alt="presentation" />
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="dis">
              <div className="hero" style={{marginLeft:"30px"}}>
              <p className="para1">Our products</p>
              <h1 className="heading1">
                      They're amazing everywhere you look
                </h1>
                <div
                      style={{
                        display: "flex",
                        marginLeft: "48px",
                        marginTop: "20px",
                        width: "500px",
                        marginRight: "250px",
                        fontSize: "1.4rem",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      We need only one thing , customer’s SATISFACTION
                    </div>

                    <button className="btn_shopnow">
                      Shop Now <ArrowRightOutlined icon={faBars} />
                    </button>
                    
              </div>
              <div className="image-container" style={{marginLeft:"-150px"}}>
                <img className="home_img" src={img2} alt="presentation" />
              </div>
            </div>
          </div>

           <div className="slide">
            <div className="dis">
              <div className="hero">
              <p className="para2" style={{marginTop:"00px"}}>About us</p>
              <h1 className="heading1">The Best Collection of Shirts</h1>
               
                 <div
                      style={{
                        display: "flex",
                        marginLeft: "100px",
                        marginTop: "20px",
                        width: "450px",
                        marginRight: "250px",
                      }}
                    >
                      fashion style for a long time with some big name companies
                      behind it. I’ve gotten to watch our videos, interview and
                      look at all of their cool products in person as well.” At
                      first, Lott says that the product has been too expensive
                      but he’s not worried about being left out; “With my budget
                      now
                    </div>
                    <button className="btn_shopnow1">
                      Shop Now <ArrowRightOutlined icon={faBars} />
                    </button>
              </div>
              <div className="image-container">
                <img className="home_img" src={img3} alt="presentation" />
              </div>
            </div>
          </div> 

        </Slider>
      </div>
      

      {/* <div style={{ backgroundColor: "#D1EAF0" }}>
        <div class="search-container">
          <Search
            className="search"
            placeholder="Search by category"
            onSearch={onSearch}
            enterButton
          />
        </div>
        {searchProduct && <h1 className="text-danger" style={{marginLeft:"85px",fontSize:"1.3erm"}}>{searchProduct}</h1>}
        <Carousel autoplay style={{ backgroundColor: "none" }}>
          <div>
            <div className="dis">
              <div className="hero">
                <p className="para">Fashion Hunt </p>
                <h1 className="heading">
                  Shop the Hottest Brands and Designs at Shop
                </h1>
                <div className="btn-container">
                  <button className="btn" onClick={handleProducts}>
                    Shop Now ..
                  </button>
                </div>
              </div>
              <div>
                <img className="home_img" src={img1} alt="presentation" />
              </div>
            </div>
          </div>

          <div>
            <div className="dis">
              <div className="hero">
                <p className="para">Fashion Hunt </p>
                <h1 className="heading">
                  Shop the Hottest Brands and Designs at Shop
                </h1>
                <div className="btn-container">
                  <button className="btn" onClick={handleProducts}>
                    Shop Now ..
                  </button>
                </div>
              </div>
              <div>
                <img className="home_img" src={img2} alt="presentation" />
              </div>
            </div>
          </div>

          <div>
            <div className="dis">
              <div className="hero">
                <p className="para">Fashion Hunt </p>
                <h1 className="heading">
                  Shop the Hottest Brands and Designs at Shop
                </h1>
                <div className="btn-container">
                  <button className="btn" onClick={handleProducts}>
                    Shop Now ..
                  </button>
                </div>
              </div>
              <div>
                <img className="home_img" src={img3} alt="presentation" />
              </div>
            </div>
          </div>
        </Carousel>
      </div> */}



      <div className="content opacity-image">
        <div style={{ display: "flex", marginLeft: "50px", marginTop: "13px" }}>
          <div>
            <i
              className="bi bi-cart3"
              style={{
                color: "#40E0D0",
                fontSize: "35px",
                marginRight: "10px",
              }}
            ></i>
          </div>

          <div>
            <h6 style={{ color: "white", fontWeight: "bold" }}>
              Free Shipping
            </h6>
            <h6 style={{ color: "white" }}>When ordering over $1000</h6>
          </div>
        </div>

        <div style={{ display: "flex", marginLeft: "50px", marginTop: "13px" }}>
          <div>
            <i
              className="bi bi-arrow-clockwise"
              style={{
                color: "#40E0D0",
                fontSize: "35px",
                marginRight: "10px",
              }}
            ></i>
          </div>

          <div>
            <h6 style={{ color: "white", fontWeight: "bold" }}>Free Return</h6>
            <h6 style={{ color: "white" }}>Get Return within 30 days</h6>
          </div>
        </div>

     <div
          style={{
            display: "flex",
            marginLeft: "50px",
            marginTop: "13px",
            marginRight: "20px",
          }}
        >
          <div>
            <i
              className="bi bi-file-lock"
              style={{
                color: "#40E0D0",
                fontSize: "35px",
                marginRight: "10px",
              }}
            ></i>
          </div>
          <div>
            <h6 style={{ color: "white", fontWeight: "bold" }}>
              Secure Payment
            </h6>
            <h6 style={{ color: "white" }}>100% Secure Online Payment</h6>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "50px",
            marginTop: "13px",
            marginRight: "20px",
          }}
        >
          <div>
            <i
              className="bi bi-trophy"
              style={{
                color: "#40E0D0",
                fontSize: "35px",
                marginRight: "10px",
              }}
            ></i>
          </div>
          <div>
            <h6 style={{ color: "white", fontWeight: "bold" }}>Best Quality</h6>
            <h6 style={{ color: "white" }}>Original Product Guarenteed</h6>
          </div>
        </div> 
      </div>

      <div style={{display:"flex",height:"400px",paddingTop:"80px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
     <motion.div style={{ marginRight: "20px" }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 1.0 }}
        >
          <p style={{  width: "440px", marginLeft: "30px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",marginTop:"30px",padding:"15px" }}> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
             when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into electronic
               typesetting, remaining essentially unchanged.</p>
        </motion.div>
     
        <motion.div style={{ marginRight: "20px" }}
          initial={{ opacity: 0, scale: 0, x: 500 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 1.0 ,delay:2}}
        >
          <img src={img1} alt="img1" style={{ height: "250px", width: "250px", marginLeft: "20px" }} />
        </motion.div>
      
        <motion.div style={{ marginRight: "20px" }}
          initial={{ opacity: 0, scale: 0, x: 400 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 1.0 ,delay:4}}
        >
          <img src={img2} alt="img2" style={{ height: "250px", width: "250px", marginLeft: "20px" }} />
        </motion.div>
        <motion.div style={{ marginRight: "20px" }}
          initial={{ opacity: 0, scale: 0, x: 150 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 1.0 ,delay:6}}
        >
          <img src={img3} alt="img3" style={{ height: "250px", width: "250px", marginLeft: "20px" }} />
        </motion.div>
  </div>

      <Product1 />

      {/* <div className="home_back">
        <div class="w-full xl:p-12 p-5">
          <div class="countdown-wrapper w-full flex space-x-[23px] mb-10">
            <div className="offer">
              <div class="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <span class="font-700 sm:text-[30px] text-[14px] text-[#EB5757]">
                  0
                </span>
              </div>
              <p class="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                Days
              </p>
            </div>
            <div class="countdown-item">
              <div class="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <span class="font-700 sm:text-[30px] text-[14px] text-[#2F80ED]">
                  0
                </span>
              </div>
              <p class="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                Hours
              </p>
            </div>
            <div >
              <div class=" countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <span class="font-700 sm:text-[30px] text-[14px] text-[#219653]">
                  0
                </span>
              </div>
              <p class="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                Minutes
              </p>
            </div>
            <div class="countdown-item">
              <div class="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <span class="font-700 sm:text-[30px] text-[14px] text-[#EF5DA8]">
                  0
                </span>
              </div>
              <p class="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                Seconds
              </p>
            </div>
          </div>
          <div class="countdown-title mb-4 ml-5">
            <h1 className="heading1">WOO! Flash Sale</h1>
            <p className="para1">
              You get into the 2k+ best Products in Flash offer with a<br></br>
              special-shaped sofa for sale.
            </p>
          </div>
          <div >
            
              <span
               className="shopnow"
                onClick={handleProducts}
              >
                Shop Now
              </span>
            
          </div>
        </div>
      </div> */}

      <ProductAll data={data} />
    </>
  );
};

export default Landing;
