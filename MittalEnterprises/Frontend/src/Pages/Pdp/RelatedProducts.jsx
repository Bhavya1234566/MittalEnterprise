import React, {
  useEffect,
  useState,
} from "react";

import "./RelatedProducts.css";

import Items from "../../Components/Items/Items";

const RelatedProducts = ({
  currentProduct,
}) => {

  // ======================================================
  // STATE
  // ======================================================

  const [
    relatedProducts,
    setRelatedProducts,
  ] = useState([]);


  const [loading, setLoading] =
    useState(true);


  // ======================================================
  // FETCH RELATED PRODUCTS
  // ======================================================

  useEffect(() => {

    if (!currentProduct?.id) {
      return;
    }


    setLoading(true);


    fetch(
      `http://127.0.0.1:5000/api/products/${currentProduct.id}/related`
    )

      .then((response) => {

        if (!response.ok) {

          throw new Error(
            "Failed to fetch related products"
          );

        }

        return response.json();

      })

      .then((data) => {

        console.log(
          "Related Products:",
          data
        );


        if (data.success) {

          setRelatedProducts(
            data.products || []
          );

        } else {

          setRelatedProducts([]);

        }


        setLoading(false);

      })

      .catch((error) => {

        console.error(
          "Related Products API Error:",
          error
        );


        setRelatedProducts([]);

        setLoading(false);

      });

  }, [currentProduct]);


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (

      <section className="related-products">

        <h2>
          Related Products
        </h2>

        <p>
          Loading related products...
        </p>

      </section>

    );

  }


  // ======================================================
  // EMPTY
  // ======================================================

  if (
    relatedProducts.length === 0
  ) {

    return null;

  }


  // ======================================================
  // RETURN
  // (Reusing the same Items card component as Home/PLP,
  // so design + wishlist + cart behaviour matches exactly)
  // ======================================================

  return (

    <section className="related-products">

      <h2>
        Related Products
      </h2>


      <div className="related-grid">

        {relatedProducts.map(
          (item) => {

            const resolvedProduct = item;


            return (

              <Items
                key={item.id}
                product={resolvedProduct}
              />

            );

          }
        )}

      </div>

    </section>

  );

};


export default RelatedProducts;