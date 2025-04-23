import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EngravingLeftSection from "./EngravingLeftSection";
import EngravingRightSection from "./EngravingRightSection";
import EngravingFooter from "./EngravingFooter";
import Model from "./Models/Model";
import ErrorModel from "./Models/ErrorModel";
import MonoInitialModel from "./Models/MonoInitialsModel";
import UnSupportedCharModel from "./Models/UnSupportedCharModel";


import { selectEngravingData } from "../../redux/features/engraving/selectors";
import { initializeEngravingData } from "../../redux/features/engraving/engravingSlice";

const EngravingMainContent = ({ data }) => {
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
        <div className="cyo-engraving-product-detail product-wrapper cyo-wrapper cyo-page">
          <div className="row m-0">
            <EngravingLeftSection
              engravingData={engravingData}
              engravingImage={engravingImage}
            />
            <EngravingRightSection data={data} />
          </div>
        </div>
      </div>
      <EngravingFooter />
      <Model engravingType="laser" />
      <ErrorModel />
      <MonoInitialModel/>
      <UnSupportedCharModel/>
    </>
  );
};

export default EngravingMainContent;
