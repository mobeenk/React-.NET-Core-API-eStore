
import { useEffect, useState } from "react";
import { Products } from "../../App/models/products";
import ProductList from "./ProductList";



export default function Catalog() {

    const [products, setProduct] = useState<Products[]>([]);
    useEffect(() => {
      fetch('http://localhost:5001/api/Products')
      .then(res => res.json())
      .then(data => setProduct(data))
    },[])
    

    return (
        <>
            <ProductList products={products}/>
        </>
    )
}