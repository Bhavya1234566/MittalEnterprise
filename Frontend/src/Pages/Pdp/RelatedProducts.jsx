import React from "react";
import { Link } from "react-router-dom";
import all_products from "../../Components/assets/all_products";

import "./RelatedProducts.css";


const RelatedProducts = ({currentProduct})=>{


const relatedProducts = all_products
.filter(
(item)=>item.id !== currentProduct.id
)
.slice(0,4);



return(

<section className="related-products">


<h2>
Related Products
</h2>



<div className="related-grid">


{
relatedProducts.map((item)=>(


<div
className="related-card"
key={item.id}
>


<Link to={`/product/${item.id}`}>

<img
src={item.image}
alt={item.name}
/>

</Link>



<Link
to={`/product/${item.id}`}
>

<h3>
{item.name}
</h3>

</Link>



<p>
{item.brand}
</p>



<div className="related-price">


<span className="new-price">
₹{item.new_price}
</span>


<span className="old-price">
₹{item.old_price}
</span>


</div>



<Link
to={`/product/${item.id}`}
className="view-btn"
>

View Product

</Link>



</div>


))

}


</div>


</section>


)

}


export default RelatedProducts;