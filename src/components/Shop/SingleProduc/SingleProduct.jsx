import { useCart } from "react-use-cart";
import { Link, useParams } from "react-router-dom"; // Replace withRouter with useParams
import data from "../Data";
import "./SingleProduct.css";
import React from "react";

const SingleProduct = () => {
  const { productName } = useParams(); // Get productName from URL params
  const { addItem } = useCart();

  return (
    <div className="product">
      <p>
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {productName}
      </p>

      <div className="product-container">
        {data.map((item) => { // Changed 'data' to 'item' to avoid confusion
          if (item.name === productName) {
            return (
              <React.Fragment key={item.id}> {/* Use item.id if available */}
                <img src={item.img} alt={item.alt} />
                <div className="product-details">
                  <h1>{item.name}</h1>
                  <h6>{item.price} JD</h6>
                  <p>{item.info}</p>
                  <button className="add-to-cart" onClick={() => addItem(item)}>
                    Add To Cart
                  </button>
                </div>
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default SingleProduct; // Remove withRouter wrapper