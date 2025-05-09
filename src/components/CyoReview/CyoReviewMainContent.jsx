import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EngravingLeftSection from "./../Engraving/EngravingLeftSection";
import EngravingFooter from "./../Engraving/EngravingFooter";

import { selectEngravingData } from "../../redux/features/engraving/selectors";
import { initializeEngravingData } from "../../redux/features/engraving/engravingSlice";
import CyoReviewRightSection from "./../CyoReview/CyoReviewRightSection";
import CyoReviewLeftSection from "./../CyoReview/CyoReviewLeftSection";

const CyoReviewMainContent = ({ data }) => {
  const dispatch = useDispatch();
  const engravingData = useSelector(selectEngravingData);
  const engravingImage = data?.product?.images?.engravingImage;
  useEffect(() => {
    if (data?.sortedEngravingSkuAttributes) {
      dispatch(initializeEngravingData(data?.sortedEngravingSkuAttributes));
    }
  }, [data?.sortedEngravingSkuAttributes, dispatch]);

  return (
    <>
      <div role="main" id="maincontent">
        <div className="cyo-engraving-product-detail product-wrapper cyo-wrapper cyo-page engrave-review-page">
          <div className="row m-0 align-items-lg-start">
            <CyoReviewLeftSection
              engravingData={engravingData}
              engravingImage={engravingImage}
            />
            <CyoReviewRightSection data={data} />
          </div>
        </div>
      </div>
      <EngravingFooter />
    </>
  );
};

export default CyoReviewMainContent;
