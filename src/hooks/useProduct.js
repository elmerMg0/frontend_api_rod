import { useState } from "react";
import { APISERVICE } from "../services/api.services";
export function useProduct (){
    const [products, setProducts] = useState([])

    const getProducts = async (idCategory) => {
        let url = "categoria/get-products-by-category/?";
        let params = `idCategory=${idCategory}`;
        const { success, products } = await APISERVICE.get(url, params);
        if (success) {
          setProducts(products);
        }
      };

    return { products, getProducts};
    /* AL retormar el product mapear con todos cantidad 0 */
}   