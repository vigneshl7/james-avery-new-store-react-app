import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsupportedCharModel } from "../../../redux/features/engraving/selectors";
import { setUnSupportedCharacterModelOpen } from "../../../redux/features/engraving/engravingSlice";


const Model = ({ engravingType }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(unsupportedCharModel);

  return (
    <>
      <div
        className={`modal fade engraving-details ${isOpen ? "show" : ""}`}
        id="CYO_standard_supported-characters"
        tabIndex="-1"
        aria-labelledby="CYO_standard_supported-characters"
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
                  dispatch(setUnSupportedCharacterModelOpen({ isOpen: false }))
                }
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-4">
                <strong className="m-0 font-proxima-bold">
                  Supported Characters
                </strong>
              </p>
              <p className="unsupported-text-heading">Special Characters</p>
              <p className="font-14 mb-4 text-start">
                ! &nbsp; " &nbsp; # &nbsp; $ &nbsp; % &nbsp; &amp; &nbsp; '
                &nbsp; ( &nbsp; ) &nbsp; * &nbsp; + &nbsp; , &nbsp; . &nbsp; /
                &nbsp; : &nbsp; ; &nbsp; {"<"} &nbsp; = &nbsp; {">"} &nbsp; ?
                &nbsp; @ &nbsp; [ &nbsp; - &nbsp; ] &nbsp; ^ &nbsp; _ &nbsp; `
                &nbsp; {"{"} &nbsp; | &nbsp; {"}"} &nbsp; ~
              </p>{" "}
              <p className="unsupported-text-heading">Letters</p>
              <p className="font-14 mb-4">A - Z, a - z</p>
              <p className="unsupported-text-heading">Numbers</p>
              <p className="font-14 mb-2">0 - 9</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div class="modal-backdrop fade show"></div>}
    </>
  );
};

export default Model;
