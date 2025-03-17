import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { CartProvider } from "react-use-cart"; 
import "./App.css";
import Profile from "./components/Profile/Profile";
import Shop from "./components/Shop/Shop";
import Home from "./components/Home/Home";
import Signup from "./components/registerationforms/Signup";
import Login from "./components/registerationforms/Login";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SingleProduct from "./components/Shop/SingleProduc/SingleProduct";
import Slider from "./components/Slider/Slider";
import Checkout from "./components/Checkout/Checkout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import OurTeam from "./components/OurTeam/OurTeam";

const App = () => {
  // All State
  const [userSignupInformation, setUserSignupInformation] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [userLoginInformation, setUserLoginInformation] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [logged, setLogged] = useState(false);
  const [checkOrdered, setCheckOrdered] = useState(false);

  return (
    <Router>
      <CartProvider>
        <NavBar logged={logged} setLogged={setLogged} />
        <ScrollToTop />
        <Routes>
          <Route
            path="/registeration"
            element={
              <div className="register-style">
                <Signup
                  setUserSignupInformation={setUserSignupInformation}
                  userSignupInformation={userSignupInformation}
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  logged={logged}
                  setLogged={setLogged}
                />
                <Login
                  userLoginInformation={userLoginInformation}
                  setUserLoginInformation={setUserLoginInformation}
                  logged={logged}
                  setLogged={setLogged}
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                />
              </div>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/profile"
            element={
              <Profile
                checkOrdered={checkOrdered}
                logged={logged}
                setLogged={setLogged}
              />
            }
          />
          <Route path="/shop/:productName" element={<SingleProduct />} />
          <Route path="/slider" element={<Slider />} />
          <Route
            path="/checkout"
            element={<Checkout setCheckOrdered={setCheckOrdered} />}
          />
          <Route path="/our-team" element={<OurTeam />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
};

export default App;