import React, { useEffect, useState } from "react";
import { Button } from "../ReUseableCom";
import { useDispatch, useSelector } from "react-redux";
import { setCart_Redux } from "../../Redux/slice";

const ProductList = ({ product }) => {
  const cartRedux = useSelector((state) => state.cart_redux);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart((prev) => [...prev, product]);
    }
  };
  useEffect(() => {
    dispatch(setCart_Redux([...cart]));
  }, [cart]);

  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }
  return (
    <>
      <div className="row">
        {product?.map((item, ind) => {
          let validCart = cartRedux?.find(
            (cartItem) => cartItem.id === item.id
          );
          let ratting = [];
          for (let i = 0; i < item.rating.rate; i++) {
            ratting.push(i);
          }
          return (
            <>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="product">
                  <div className="img">
                    <img src={item.image} alt={item.image} height={200} />
                    <Button
                      onClick={() => handleAddToCart(item)}
                      style={{ background: validCart ? "red" : "#111827" }}
                      label={validCart ? "Remove From Cart" : "Add To Cart"}
                    />
                  </div>
                  <div className="content">
                    <h6>{truncateText(item.title, 25)}</h6>
                    <div className="rateCover">
                      <p>${item.price}</p>
                      <div className="rating">
                        {ratting.map((rat, i) => {
                          return <i class="fa fa-star" aria-hidden="true"></i>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
