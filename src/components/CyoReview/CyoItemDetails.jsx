import React, { useState } from "react";

const CyoItemDetails = ({ data = {} }) => {
  return (
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
                  {"Engrave "}
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
  );
};

export default CyoItemDetails;
