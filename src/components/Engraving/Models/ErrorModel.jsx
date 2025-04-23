import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorModel } from "../../../redux/features/engraving/selectors";
import { setErrorModelOpen } from "../../../redux/features/engraving/engravingSlice";

const ErrorModel = ({ engravingType }) => {
  const dispatch=useDispatch()
  const isOpen=useSelector(errorModel)

  return (
    <>
    <div
      className={`modal fade engraving-details ${isOpen ? "show" : ""}`}
      id="cyoEngravingModalError"
      tabIndex="-1"
      aria-labelledby="cyoEngravingModalError"
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
              onClick={()=>dispatch(setErrorModelOpen({isOpen: false}))}
            ></button>
          </div>
          <div class="modal-body">
                Please fix errors before continuing.
            </div>
        </div>
      </div>
    </div>
    {isOpen && <div class="modal-backdrop fade show"></div>}
    </>
  );
};

export default ErrorModel;
