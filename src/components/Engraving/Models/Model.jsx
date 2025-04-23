import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectModel } from "../../../redux/features/engraving/selectors";
import { setModelOpen } from "../../../redux/features/engraving/engravingSlice";

const Model = ({ engravingType }) => {
  const dispatch = useDispatch();
  const modelData = useSelector(selectModel);
  const { isOpen, type } = modelData;
  const isLaser = type === "laser";

  const imgUrl = isLaser
    ? "https://www.jamesavery.com/on/demandware.static/-/Sites-JamesAvery-Library/default/dweba1e65a/CYO%20Engraving/Laser%20Image.jpg"
    : "https://www.jamesavery.com/on/demandware.static/-/Sites-JamesAvery-Library/default/dw9f073874/CYO%20Engraving/Hand%20Image.jpg";

  return (
    <>
      <div
        className={`modal fade engraving-details ${isOpen ? "show" : ""}`}
        id="CYO_hand_engraving-details"
        tabIndex="-1"
        aria-labelledby="CYO_hand_engraving-detailsLabel"
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
                  dispatch(setModelOpen({ isOpen: false, type: engravingType }))
                }
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <img
                  alt={`${isLaser ? "laser" : "hand"} engraving details`}
                  height={isLaser ? "136" : "146"}
                  src={imgUrl}
                  title={`${isLaser ? "laser" : "hand"} engraving details`}
                  width="121"
                />
              </div>
              <p className="m-0">
                <strong className="m-0 font-proxima-bold">
                  {isLaser ? "Laser" : "Hand"} Engraving
                </strong>
              </p>
              <p className="font-14">
                {isLaser
                  ? "Crisp, Clear, Easy-to-Read"
                  : "Artistic, Reflective, One-of-a-Kind"}
              </p>
              <p>{isLaser ? "$20 Minimum" : "$40 Minimum"}</p>
              <p className="m-0 font-14">
                {isLaser ? "Up to 10 Characters" : "Up to 4 Characters"}
              </p>
              {/* Correct usage of <br /> */}
              <p className="m-0 font-12 text-padding">
                {isLaser ? (
                  <>
                    Including Symbols & Punctuation
                    <br />
                    $2 For Each Additional Character
                  </>
                ) : (
                  <>
                    Including Symbols & Punctuation
                    <br />
                    $10 For Each Additional Character
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div class="modal-backdrop fade show"></div>}
    </>
  );
};

export default Model;
