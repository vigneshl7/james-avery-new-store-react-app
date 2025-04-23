import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  unsupportedCharModel} from "../../../redux/features/engraving/selectors";

import { setMonoGramModelOpen } from "../../../redux/features/engraving/engravingSlice";

const Model = ({ engravingType }) => {
  const dispatch = useDispatch();
  const  isOpen  = useSelector(unsupportedCharModel);

  return (
    <>
      <div
        className={`modal fade engraving-details ${isOpen ? "show" : ""}`}
        id="CYO_monogram_engraving-details"
        tabIndex="-1"
        aria-labelledby="CYO_monogram_engraving-details"
        style={{ display: isOpen ? "block" : "none" }}
        aria-hidden={!isOpen}
        aria-modal={isOpen}
        role={isOpen ? "dialog" : undefined}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close gtm-close-btn gtm-cyo-engrave-detail-modal-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  dispatch(setMonoGramModelOpen({ isOpen: false }))
                }
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong className="m-0 font-proxima-bold">
                  Monogram Engraving
                </strong>
              </p>
              <ul className="monogram-list-details">
                <li>Allows for Initials Only</li>
                <li>
                  Traditional Monograms are First, Last and Middle Initials
                </li>
                <li>Must Enter All 3 Initials for Monogram</li>
                <li>Monograms are Defaulted to Uppercase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div class="modal-backdrop fade show"></div>}
    </>
  );
};

export default Model;
