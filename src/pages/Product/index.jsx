import React, { useEffect, useState } from "react";
import { ProductData } from "../../Utils/Api";
import { useSelector } from "react-redux";
import Loader from "../../common/Loder";
import CategoryFilter from "../../Componants/CategoryFilter";
import ProductList from "../../Componants/ProductList";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const search = useSelector((state) => state.search_redux);
  const categoryWiseFilterRedux = useSelector(
    (state) => state.categoryWiseFilter_redux
  );
  const [ascending, setAscending] = useState(true);

  const fetch_Product = async () => {
    try {
      let res = await ProductData();
      if(!!res){
        setProductData(res);
      }else {
        setProductData([]);
      }
    } catch (error) {
      console.log("error fetching product", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetch_Product();
  }, []);

  const searchFilter = productData?.filter((item) =>
    search != ""
      ? Object.entries(item)?.some(([key, value]) =>
          value?.toString()?.toLowerCase()?.includes(search?.toLowerCase())
        )
      : productData
  );

  const product = searchFilter?.filter((item) =>
    categoryWiseFilterRedux.length > 0
      ? categoryWiseFilterRedux.includes(item.category)
      : searchFilter
  );

  const shortBy = () => {
    let shortData = productData?.sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
    setAscending(!ascending);
    setProductData([...shortData]);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="productCover">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-3">
              <CategoryFilter productData={productData} />
            </div>
            <div className="col-sm-12 col-md-8 col-lg-9">
              <div className="shortedCover">
                <label htmlFor="exampleFormControlSelect1">Short By :</label>
                <button onClick={shortBy} className="shortBytBtn">
                  Price{" "}
                  <span>
                    <i
                      class={`fa ${ascending ? "fa-sort-desc" : "fa-sort-asc"}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                </button>
              </div>
              <ProductList product={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
