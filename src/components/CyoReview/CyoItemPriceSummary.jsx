import React, { useState } from "react";

const CyoItemPriceSummary = ({ data = {} }) => {
  return (
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
  );
};

export default CyoItemPriceSummary;
