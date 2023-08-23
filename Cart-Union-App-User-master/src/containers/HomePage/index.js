import React from "react";
import Layout from "../../components/Layout";
import "./style.css";
import { Link } from "react-router-dom";
import BannerImage from "../../images/couples.svg";
import { RiTeamLine } from "react-icons/ri";
import { GiHeadbandKnot } from "react-icons/gi";
import { AiOutlineCloud } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";

/**
 * @author
 * @function HomePage
 **/
const HomePage = (props) => {
  return (
    <Layout>
      <div className="main_container">
        <section className="sub_section">
          <div className="sub_container_left">
            <p className="tag_line">WELLCOME TO PAKISTAN's FIRST ONLINE WHOLESALE STORE</p>
            <p className="description">
              Your one-stop online wholesale store for the people of pakistan to boost there reach and 
              compete with the top industries of pakistan on the same page
            </p>
            <Link>
              <button type="button" className="book_now_button">
                Order now
              </button>
            </Link>
          </div>
          <div className="sub_container_right">
            <img className="bannerImage" src={BannerImage} alt="bannerImage" />
          </div>
        </section>
        <div className="main_container2">
          <div className="services">
            <div className="service1">
              <RiTeamLine className="together_icon" />
              <h2 className="together_heading">what is cart-union</h2>
              <p className="together_para">
                cart union is a online store which prioritize the wholesale Business but at the same time 
                you can also buy products in one or two quantity over main focus is to create a store of B2B business 
                which is not available in pakistan.
              </p>
            </div>
            <div className="service1">
              <GiHeadbandKnot className="together_icon" />
              <h2 className="together_heading"></h2>
              <p className="together_para">
                Our expert team designed the whole sale online store to be
              a creative space for everyone to collaborate, virtually. Whether
              you’re a local local seller juggling several projects
              simultaneously online. Or your whole family is helping you piece
              together the dream business.
              </p>
            </div>
            <div className="service1">
              <AiOutlineCloud className="together_icon" />
              <h2 className="together_heading">Stored Safely</h2>
              <p className="together_para">
                We understand the time, and emotional energy it takes tomake a brand and we always do our best to
                keep your privacy so the competetors cant track your orders.
              </p>
            </div>
          </div>
          <div className="quality">
            <h2 className="quality_description">
              A whole sale market for everyone
            </h2>
            <p style={{color:'#071F45'}}>
              Our expert team designed the whole sale online store to be
              a creative space for everyone to collaborate, virtually. Whether
              you’re a local local seller juggling several projects
              simultaneously online. Or your whole family is helping you piece
              together the dream business.
            </p>
          </div>
        </div>
        <div className="divider">
          <hr style={{ color: "grey" }} />
        </div>
        <div className="footer">
          <div className="items">
            <div className="item_sub">
              <ul className="item_sub_list">
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">become a seller</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">Our Projects</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">Create New brand Project</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">best seller Of The Day</a>
                </li>
              </ul>
            </div>
            <div className="item_sub">
              <ul className="item_sub_list">
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">Business Portal</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">Ideas & Advic</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">Pricing</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">FAQs</a>
                </li>
              </ul>
            </div>
            <div className="item_sub">
              <ul className="item_sub_list">
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">About Us</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">Contact Us</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">Services</a>
                </li>
                <li className="item_sub_list_items">
                  <a className="footer_link" href="#">Investors</a>
                </li>
              </ul>
            </div>

            <div className="item_sub">
              <h4>Social Media</h4>
              <ul className="item_sub_list">
                <li className="item_sub_list_items">
                  <a href="#">
                    <FiFacebook size={20} className="social_icon" />
                  </a>
                </li>
                <li className="item_sub_list_items">
                  <a href="#">
                    <BsInstagram size={20} className="social_icon" />
                  </a>
                </li>
                <li className="item_sub_list_items">
                  <a href="#">
                    <FaTwitter size={20} className="social_icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="copyright">Copyright © 2023 CART UNION WHOLESALE, All rights reserved.</p>

        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
