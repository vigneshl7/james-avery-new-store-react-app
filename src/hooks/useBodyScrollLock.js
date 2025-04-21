// src/hooks/useBodyScrollLock.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectModel } from "../redux/features/engraving/selectors";

const useBodyScrollLock = () => {
  const isModelOpen = useSelector(selectModel);

  useEffect(() => {
    const body = document.body;

    if (isModelOpen?.isOpen) {
      body.classList.add("modal-open");
      body.style.overflow = "hidden";
      body.style.paddingRight = "0px";
    } else {
      body.classList.remove("modal-open");
      body.style.overflow = "";
      body.style.paddingRight = "";
    }

    return () => {
      body.classList.remove("modal-open");
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [isModelOpen?.isOpen]);
};

export default useBodyScrollLock;
