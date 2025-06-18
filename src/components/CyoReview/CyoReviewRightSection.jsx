import React, { useState } from "react";
import wishlist from "./../../assets/wishlist.png";
import CyoItemDetails from "./CyoItemDetails";
import CyoItemPriceSummary from "./CyoItemPriceSummary";

const CyoReviewRightSection = ({ data = {} }) => {
  return (
    <div
      className="col-12 col-lg-6 product-detail-right-section"
      // style={{
      //   flexDirection: "column",
      //   alignItems: "flex-start",
      //   display: "flex",
      //   justifyContent: "flex-start",
      // }}
    >
      <div
        className="engraving-review-heading text-center"
        // style={{
        //   alignSelf: "center",
        // }}
      >
        Review Custom Jewelry Details
      </div>

      <CyoItemDetails />

      <span
        // style={{
        //   backgroundColor: "#d7d7d7",
        //   height: 1,
        //   width: "100%",
        // }}
      ></span>
      <a
        className="add-to-wish-list logged-in-user review gtm-cyo-review-wishlist"
        href="#"
        data-pid="CM-1093-485374"
        data-product-name="Engravable Disc Charm"
        data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Wishlist-AddProduct"
        title="Wishlist"
        data-wishlist-show="/wishlist"
        data-gtm-array='[{"id":"CM-1093","name":"Engravable Disc Charm","brand":"James Avery","price":49,"category":"Charms","variant":"CM-1093-485374","quantity":1,"list":"CYO - Engrave","dimension1":"Sterling Silver"}]'
      >
        <span
        // className="fa-stack fa-lg"
        // style={{ backgroundColor: "red" }}
        >
          {/* <img
            src={wishlist}
            // className="engraving-image"
            // alt="Engravable Disc Charm image number 0.0"
            style={{ width: 20, color: "black" }}
            itemprop="image"
          /> */}
          {/* <i className="fa fa-inverse fa-stack-1x"></i>
          <i className="fa fa-heart-o fa-stack-1x"></i> */}
        </span>
        <span className="add-to-wish-list-text gtm-cyo-wish-list-btn">
          Save to Wishlist
        </span>
      </a>

      <div className="attention-message ">
        <div className="html-slot-container">
          <p>
            <strong>Attention</strong>: All custom orders will delay your entire
            order by several days, regardless of shipping method.
          </p>

          <ul>
            <li>
              Allow 2-8 Business Days for Engraving and/or Attachment Services
            </li>
            <li>Engraving May Vary Slightly From Preview</li>
            <li>Engraving Not Available for In-Store Pickup</li>
          </ul>
        </div>
      </div>
      <CyoItemPriceSummary />
    </div>
  );
};

export default CyoReviewRightSection;
