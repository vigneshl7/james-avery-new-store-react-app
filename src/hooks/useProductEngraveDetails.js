import { useQuery } from "react-query";
import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

export const useFetchProducts = () => {
  return useQuery("products", fetchProducts);
};


// const fetchProducts = async () => {
//     const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
//     return data;
//   };