
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { Products } from "../../App/models/products";
import ProductList from "./ProductList";



export default function Catalog() {

    const [products, setProduct] = useState<Products[]>([]);
    const [loading, setLoading] = useState(true);


        useEffect(() => {
            agent.Catalog.list()
            .then( (response) => { setProduct(response);  })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        },[])

        if(loading) return <LoadingComponent message="Loading Products"/>
    

    return (
        <>
            <ProductList products={products}/>
        </>
    )
}