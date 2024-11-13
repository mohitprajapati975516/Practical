export const Button = (props) => {
    return <>
        <button className={props.className} onClick={props.onClick} style={props.style}>{props.label}</button>
    </>
}
export const CartList = ({item, ind, handleRemoveToCart}) => {
    return <>
          <div key={ind} className="cartProduct">
            <div className="img">
              <img src={item.image} alt="img" />
            </div>
            <div className="content">
              <h6>{item.title}</h6>
              <h5>{item.category}</h5>
              <strong>${item.price}</strong>
              <div className="btns">
              <Button className="removeToCart" onClick={handleRemoveToCart} label="Remove"/>
              </div>
            </div>
          </div>
    </>
}