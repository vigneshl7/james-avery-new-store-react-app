import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CyoReviewMainContent from "../components/CyoReview/CyoReviewMainContent";
import { productDataFrBk } from "/public/sampleData/FrBk.js";
import { productDataInside } from "/public/sampleData/Inside.js";
import { productDataFullSide } from "/public/sampleData/FullSide.js";
import { useNavigate } from "react-router-dom";

const CyoReviewPage = () => {
  const data = productDataFrBk;
  return (
    <div>
      <Header showRightButton={false} />
      <CyoReviewMainContent data={data} />
    </div>
  );
};

export default CyoReviewPage;
