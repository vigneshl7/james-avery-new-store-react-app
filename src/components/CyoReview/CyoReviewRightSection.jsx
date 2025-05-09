import React, { useState } from "react";

const CyoReviewRightSection = ({ data = {} }) => {
  return (
    <div
      className="col-12 col-lg-6 product-detail-right-section"
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div
        className="engraving-review-heading text-center"
        style={{
          alignSelf: "center",
        }}
      >
        Review Custom Jewelry Details
      </div>
      <div className="engraving-summary-info">
        <div className="engraving-info">
          <div className="item-image text-center">
            <img
              src=""
              className="engraving-image"
              // alt="Engravable Disc Charm image number 0.0"
              itemprop="image"
            />
            <span
              className="manifying-icon"
              id="manifying-image"
              data-href="https://cyo.jamesavery.com/2p8phba8"
            ></span>
          </div>
          <div className="item-info w-100">
            <div className="item-header">
              <div className="item-name">Engravable Disc Charm</div>
              <div className="line-item-total-price">
                <div className="unit-price">
                  <div className="price">
                    <span>
                      <span className="sales">
                        <span className="value" content="49.00">
                          $49.00
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-attributes d-flex">
              <p className="line-item-attributes">Metal: Sterling Silver</p>
            </div>

            <div className="engrave-page-redirect">
              <div>
                <div className="btnpadding">
                  <a
                    href="javascript:void(0)"
                    className="review-redirects"
                    data-pid="CM-1093-485374"
                    data-navlist="CYO - Engrave"
                    data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-CyoShow"
                    data-engrave="true"
                    data-lineitem-uuid=""
                  >
                    Engrave
                  </a>

                  <a
                    href="javascript:void(0)"
                    className="review-redirects"
                    data-pid="CM-1093-485374"
                    data-navlist="CYO - Engrave"
                    data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-CyoShow"
                    data-pickholder="true"
                    data-lineitem-uuid=""
                  >
                    Pick a Holder
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
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
        <span className="fa-stack fa-lg">
          <i className="fa fa-inverse fa-stack-1x"></i>
          <i className="fa fa-heart-o fa-stack-1x"></i>
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

      <div
        className="add-to-cart-actions"
        style={{
          width: "100%",
        }}
      >
        <div className="row">
          <div className="price-summary col-sm-12 col-md-6">
            <div className="price-container">
              <p className="price-summary-text">Price Summary</p>
              <p className="price-text font-proxima-bold">$49.00</p>
            </div>

            <div className="klarna-info">
              <script
                src="https://js.klarna.com/web-sdk/v1/klarna.js"
                async="async"
                data-client-id="45215a2c-e9b1-5e8e-9446-b24dd8ba1470"
              ></script>

              <link
                rel="stylesheet"
                href="https://x.klarnacdn.net/onsite-messaging/fonts/v1.2/fonts.css"
              />
            </div>
          </div>
          <div className="cyo-add-to-cart col-sm-12 col-md-6">
            <div className="row cart-and-ipay">
              <div className="col-sm-12">
                <input
                  type="hidden"
                  className="add-to-cart-url"
                  value="/on/demandware.store/Sites-JamesAvery-Site/en_US/Cart-AddProduct"
                />
                <button
                  className="add-to-cart btn btn-primary gtm-add-to-cart fromcyo"
                  data-gtm-data=""
                  data-pdpaddtocart-name="Engravable Disc Charm"
                  data-toggle="modal"
                  data-target="#chooseBonusProductModal"
                  data-cyoexperience="false"
                  data-engravingexperience="true"
                  data-pid="CM-1093-485374"
                  data-gtm-array='[{"id":"CM-1093","name":"Engravable Disc Charm","brand":"James Avery","price":49,"category":"Charms","variant":"CM-1093-485374","quantity":1,"list":"CYO - Engrave","dimension1":"Sterling Silver"}]'
                  data-from-cart="null"
                  data-line-item-uuid="null"
                  data-pids=""
                >
                  Add to Cart
                </button>
              </div>

              <div className="inStock d-none" data-jac="shipping-msg">
                <span className="close-icon">×</span>
                <span className="availability-msg">
                  This item is out of stock
                </span>
              </div>
            </div>
          </div>

          <div
            className="modal fade cyo-exit-modal"
            id="null"
            tabindex="-1"
            aria-labelledby="nullLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close gtm-cyo-exit-modal-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <div className="cyo-exit-save-to-wishlist">
                    <a
                      href="#"
                      className="cyo-exit-save-to-wishlist-btn logged-in-user btn btn-primary font-proxima-bold review from-engraving gtm-cyo-exit-modal-add-to-wishlist"
                      data-pid="CM-1093-485374"
                      data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Wishlist-AddProduct"
                      data-wishlist-show="/wishlist"
                    >
                      Save to Wishlist
                    </a>
                  </div>

                  <div className="cyo-exit-continue-design">
                    <span
                      className="text-decoration-underline gtm-cyo-exit-modal-continue-design"
                      data-bs-dismiss="modal"
                      role="button"
                    >
                      Continue Designing
                    </span>
                  </div>
                  <div className="cyo-exit-dont-save">
                    <a
                      href="javascript:void(0)"
                      data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-ResetData"
                      className="cyo-exit-dont-save-btn text-decoration-underline from-engraving gtm-cyo-exit-modal-dont-save"
                    >
                      Don’t Save
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyoReviewRightSection;
