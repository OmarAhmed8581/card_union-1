import React, { useEffect } from 'react';
import { Carousel} from "react-bootstrap";
import Layout from "../../components/Layout";
import sliderImage1 from "../../images/sliderImage1.PNG";
import sliderImage2 from "../../images/sliderImage2.PNG";
import sliderImage3 from "../../images/sliderImage3.PNG";
import sliderImage4 from "../../images/sliderImage4.PNG";
import sliderImage5 from "../../images/sliderImage5.PNG";
import { useSelector } from "react-redux";

import "./style.css";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {


  const auth = useSelector((state) => state.auth);
  var seller_token= auth['token'];
  const sessionCheckInterval = 1000 * 6; // 1 minute in milliseconds

  // Check session status periodically

  // console.log(seller_token)

  // useEffect(() => {
  //   // Check the token's expiration and perform actions based on it
  //   // This code only checks the token in the client's Redux store,
  //   // not the actual server-side session or token validity
  //   if (!seller_token) {
  //     // Token not found, handle as needed (e.g., redirect to login)
  //     console.log("Token not found");
  //   } else {
  //     // You might want to extract and decode the token payload to check its expiration time
  //     // Compare the expiration time with the current time and perform actions
  //     // (e.g., refresh token, redirect to login, etc.)
  //     console.log("Token found:", seller_token);
  //   }
  // }, [seller_token]);


  // useEffect(() => {
  //   // Check token validity initially
  //   checkTokenValidity();

  //   // Set up an interval to check token validity every 5 minutes (adjust as needed)
  //   const intervalId = setInterval(checkTokenValidity, 1000);

  //   // Clean up the interval when the component is unmounted
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [seller_token]);

  // const checkTokenValidity = () => {
  //   if (!seller_token) {
  //     console.log("Token not found");
  //     // Handle missing token, e.g., redirect to login
  //     return;
  //   }
  //   else{
  //     console.log("Token found");
  //   }

  //   // Decode the token payload and compare the expiration time
  //   try {
  //     const response = fetch("/api/check-session", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${seller_token}`,
  //       },
  //     });

  //     console.log(response)

  //     if (response.ok) {
  //       const data = response.json();
  //       console.log("Session valid:", data);
  //     } else {
  //       console.log("Session expired or invalid");
  //       // Handle expired or invalid session, e.g., redirect to login
  //     }
  //   } catch (error) {
  //     console.error("Error checking session:", error);
  //   }
  // };

  // const parseTokenPayload = (token) => {
  //   const tokenPayloadBase64 = token.split(".")[1];
  //   const tokenPayloadDecoded = atob(tokenPayloadBase64);
  //   return JSON.parse(tokenPayloadDecoded);
  // };


  // console.log("sesssion Check process")
  // useEffect(() => {
  //   // Check session-related data using API request
  //   fetch('/api/user/session', {
  //       method: 'GET',
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
        
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error checking session:', error);
  //     });
  // }, [auth]);



  return (
    <>
      <Layout sidebar>
        <Carousel variant="dark" autoPlay interval="1500" infiniteLoop>
          <Carousel.Item>
            <img
              className="d-block"
              style={{width:'100%' , height:'500px' }}
              src={sliderImage1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              style={{width:'100%' , height:'500px' }}
              src={sliderImage2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              style={{width:'100%' , height:'500px' }}
              src={sliderImage3}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              style={{width:'100%' , height:'500px' }}
              src={sliderImage4}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              style={{width:'100%' , height:'500px' }}
              src={sliderImage5}
              alt="Third slide"
            />
          </Carousel.Item>
          
        </Carousel>
      </Layout>
    </>
  );
};
