import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input } from "antd";
import Navbar from "../components/Navbar";
import { shuffle } from "lodash";

const Products = () => {
  const { Search } = Input;
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchProduct, setSearchProduct] = useState("");

  // Extract the id parameter from the route
  const { id } = useParams();

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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filterProduct = (cat) => {
    setCurrentCategory(cat);
    setCurrentPage(0); // Reset to first page when applying filter
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
  
  return (
    <>
      <Navbar />
      <div className="back">
        <div className="search-container">
          <Search
            className="search"
            placeholder="Search by category"
            onSearch={onSearch}
            enterButton
          />
        </div>
        {searchProduct && (
          <h1 className="text-danger" style={{ marginLeft: "400px", fontSize: "1.3rem" }}>
            {searchProduct}
          </h1>
        )}
        <div className="display">
          <div className="home">
            {perpage.map((product) => (
              <div key={product.id}>
               
                <div
                  className="card"
                  style={{
                    width: "16rem",
                    margin: "10px",
                    backgroundColor: "lightgrey",
                    height: "25rem",
                  }}
                >
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ borderRadius: "0px", height: "250px" }}
                  />
                  <div className="card-body">
                  <h4 style={{ fontSize: "1.3rem" }}>{product.category}</h4>
                  <h4
                        style={{
                          margin: "auto 0",
                          flex: "1",
                          marginTop: "15px",
                        }}
                      >
                        Price:${product.price}
                      </h4>
                      <h5
                        style={{
                          margin: "auto 0",
                          textAlign: "right",
                          marginTop: "-18px",
                        }}
                      >
                        Rating: {product.rating.rate}
                      </h5>
                    <div>
                      {isAuthenticated ? (
                        <>
                          <NavLink to={`/productsdata/${product.id}`}>
                            <button className="add" style={{marginLeft:"3px"}}>Add To Cart</button>
                          </NavLink>
                          <NavLink
                            to={`/order/${product.id}`}
                            state={{ UserEmail: location.state?.id }}
                          >
                            <button className="buynow">Buy Now</button>
                          </NavLink>
                        </>
                      ) : (
                        <NavLink to={`/productsdata/${product.id}`}>
                          <button className="add">Add To Cart</button>
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
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

export default Products;
