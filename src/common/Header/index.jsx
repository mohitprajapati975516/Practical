import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCart_Redux, setSearch__Redux } from '../../Redux/slice';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CartList } from '../../Componants/ReUseableCom';

const Header = () => {
    const [search, setSearch] = useState("");
    const cartData = useSelector((state)=> state.cart_redux)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const value = e.target.value
        setSearch(value)
        dispatch(setSearch__Redux(value))
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemoveToCart = (product) => {
        if(cartData.some((item) => item.id === product.id)){
          dispatch(setCart_Redux((cartData.filter((item) => item.id !== product.id))))
        }else{
          dispatch(setCart_Redux((prev)=>([...prev, product])))
        }
      }
    const totalAmount = cartData?.reduce((total, item) => total + item.price, 0);

  return (
    <>
       <div className="header">
        <div className="container">
          <div className="cover">
            <div className="searchCover">
              <svg
                className="absolute left-2 top-1/2 -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#fff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>

              <input type="search" placeholder="Search" value={search} onChange={handleChange}/>
            </div>
            <div className="cartBtn">
              <button onClick={handleShow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#fff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                  <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                </svg>
                {cartData.length > 0 && (
                  <span>{cartData.length}</span>
                )}
               
              </button>
            </div>
          </div>
        </div>
      </div>


      <Offcanvas show={show} onHide={handleClose} placement="end" className="cartModal">
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Cart</Offcanvas.Title> 
        </Offcanvas.Header>
        <Offcanvas.Body>
         <div className="cartList">
         {cartData?.length > 0 ? cartData?.map((item, ind) => {
        return <>
          <CartList item={item} ind={ind} handleRemoveToCart={()=> handleRemoveToCart(item)}/>
        </>
      }) : <h4 style={{textAlign: "center", color: "#fff"}}>Cart is Empty</h4>}

        {cartData.length > 0 && <div className="totalAmount">
          <h5><span>Total Amount :</span> ${totalAmount}</h5>
        </div>}
         </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Header
