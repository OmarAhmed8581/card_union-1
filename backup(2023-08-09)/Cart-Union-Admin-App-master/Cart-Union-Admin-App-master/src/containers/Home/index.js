import React from "react";
import { Carousel} from "react-bootstrap";
import Layout from "../../components/Layout";
import sliderImage1 from "../../images/sliderImage1.PNG";
import sliderImage2 from "../../images/sliderImage2.PNG";
import sliderImage3 from "../../images/sliderImage3.PNG";
import sliderImage4 from "../../images/sliderImage4.PNG";
import sliderImage5 from "../../images/sliderImage5.PNG";


import "./style.css";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
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
