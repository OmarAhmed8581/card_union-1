import React, { useEffect, useState } from "react";
import "./style.css";
import axios from 'axios';
import { getAllProductSuccess } from '../../reducers/allproduct.reducer';
import cartunion from "../../images/logo/cartunion.png";
import cartUnionlogo from "../../images/logo/cartUnion logo.png";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup , getproductmenu } from "../../actions";
import Cart from "../UI/Cart";
import { useNavigate } from "react-router-dom";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const product = useSelector((state) => state.product);

  // console.log("allproduct")
  // console.log(allproduct)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [userData, setUserData] = useState('');
  let [suggestions, setSuggestions] = useState([]); // Assuming suggestions are stored in state
  const inputRef = React.createRef(); // Ref for the input element
  console.log('product')
  console.log(product)
  console.log(auth)
  const products = useSelector((state) => state.product.products);
  console.log(products)

  const productsall = useSelector((state) => state.product.productsall);

  console.log(productsall)

  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [suggestionMap, setSuggestionMap] = useState({});
  suggestions = [
   
  ];
  var temp={}
  useEffect(() => {
    // Dispatch the action to fetch products
    dispatch(getproductmenu()).then((response) => {
      console.log(response.data)
      if (response.status === 200) {
        // Update fetchedProducts state with the fetched data
        const suggestionList = response.data.data.map((item) => item.name);
        const suggestionMap = {};
        response.data.data.forEach((item) => {
          suggestionMap[item.name] = item._id;
        });
        setSuggestionMap(suggestionMap);

        const sortedSuggestions = response.data.data
        .slice() // Create a copy of the array
        .sort((a, b) => {
          // Sort based on number of reviews and ratings
          const aTotalRating = a.ratings.reduce((total, rating) => total + rating.star, 0);
          const bTotalRating = b.ratings.reduce((total, rating) => total + rating.star, 0);
          
          return bTotalRating - aTotalRating; // Descending order
        });
        setFetchedProducts(sortedSuggestions.map((item) => item.name));

      }
    });
  }, [dispatch]);

  console.log('fetchedProducts:', fetchedProducts);
  console.log('suggestionMap:', suggestionMap);

  




  console.log(suggestions)
  console.log(temp)
  function select(element){
    console.log(element)
    
      const searchWrapper = document.querySelector(".search-input");

      console.log('searchWrapper')
      
      console.log(searchWrapper)
    
      const inputBox = searchWrapper.querySelector("input");

      const suggBox = searchWrapper.querySelector(".autocom-box");
      const icon = searchWrapper.querySelector(".icon");
      let linkTag = searchWrapper.querySelector("a");
      let webLink;
      let selectData = element.textContent;
      inputBox.value = selectData;
      icon.onclick = ()=>{
          webLink = `https://www.google.com/search?q=${selectData}`;
          linkTag.setAttribute("href", webLink);
          linkTag.click();
      }
      
      console.log(element)
      
      searchWrapper.classList.remove("active");
      if(selectData in suggestionMap){
        window.location="/"+suggestionMap[selectData]+"/"+suggestionMap[selectData]+"/p";
      }
      else{
        alert("No Product found")
      }
    
  }

  // if user press any key and release
  function searchkey(){

    const searchWrapper = document.querySelector(".search-input");

    console.log('searchWrapper')
    
    console.log(searchWrapper)
  
    const inputBox = searchWrapper.querySelector("input");

    console.log("searchkey")

      const suggBox = searchWrapper.querySelector(".autocom-box");
      const icon = searchWrapper.querySelector(".icon");
      let linkTag = searchWrapper.querySelector("a");
      let webLink;


      let userData = document.getElementById("search").value //user enetered data
      console.log(userData)
      let emptyArray = [];
      if(userData){
        icon.onclick = () => {
          webLink = `https://www.google.com/search?q=${userData}`;
          linkTag.setAttribute("href", webLink);
            linkTag.click();
        };
    
        console.log(fetchedProducts);
    
        emptyArray = fetchedProducts.filter((data) => {
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });
    
        emptyArray = emptyArray.map((data) => {
            return `<li>${data}</li>`;
        });
    
        searchWrapper.classList.add("active");
        showSuggestions(emptyArray);
    
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            // Add a click event listener directly to each <li> element
            allList[i].addEventListener("click", () => {
                select(allList[i]); // Pass the clicked element to the select function
            });
        }
      }else{
          searchWrapper.classList.remove("active"); //hide autocomplete box
      }
  }

  
  function showSuggestions(list){
    const searchWrapper = document.querySelector(".search-input");
    const inputBox = searchWrapper.querySelector("input");
    const suggBox = searchWrapper.querySelector(".autocom-box");
    const icon = searchWrapper.querySelector(".icon");
    let linkTag = searchWrapper.querySelector("a");
    let webLink;


    let listData;
    if(!list.length){
        var userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
  }


  const userSignup = () => {
    const user = {firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };
  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      if (!email || !password) {
        alert("Please enter both email and password.");
      } else if (!isValidEmail(email)) {
        alert("Please enter a valid email.");
      } else {
        dispatch(login({ email, password }));
      }
    }
    dispatch(login({ email, password }));
  };
  const isValidEmail = (value) => {
    // Use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName" id="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          { label: "CartUnion zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
      menu={
        <a
          className="loginButton"
          onClick={() => {
            setSignup(false);
            setLoginModal(true);
          }}
        >
          Login
        </a>
      }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "CART-UNION Easy Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };


  

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">

                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email/Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={userLogin}
                />
                
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="/">
            <img src={cartUnionlogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: "-55px" }}>
            {/* <span className="exploreText">Explore</span> */}
            <span className="plusText">Easy</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <form autocomplete="off" action="/action_page.php" method="POST">
            <div class="wrapper">
            <div class="search-input">
              <a href="" target="_blank" hidden></a>
              <input
                className="searchInput"
                placeholder={"search for products, brands and more"}
                id="search"
              
                onKeyUp={searchkey}
              />
              <div class="autocom-box">
              </div>
              <div class="icon"><i class="fas fa-search"></i></div>
            </div>
          </div>
         
          </form>
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on CARTUNION", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a href={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    
  );
};



 

export default Header;
