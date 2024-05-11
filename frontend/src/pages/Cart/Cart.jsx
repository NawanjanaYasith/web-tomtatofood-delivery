import './Cart.css'
import {useContext} from "react";
import {StoreContext} from "../../context/StoreContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Cart() {

    const {cartItems, food_list, removeFromCart,getTotalCartAmount} = useContext(StoreContext);
    const navigate=useNavigate();
    return (
        <div className={'cart'}>
            <div className={'cart-item'}>
                <div className={'cart-items-title'}>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {food_list.map((item, index) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div>
                                <div className={'cart-items-title cart-items-item'} key={index}>
                                    <img src={item.image} alt={''}/>
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item.id]}</p>
                                    <p>${item.price * cartItems[item.id]}</p>
                                    <p className={'remove'} onClick={() => removeFromCart(item.id)}>X</p>
                                </div>
                                <hr/>
                            </div>
                        )
                    }
                })}
                <div className={'cart-bottom'}>
                    <div className={'cart-total'}>
                        <h2>Cart Totals</h2>
                        <div>
                            <div className={'cart-total-details'}>
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <hr/>
                            <div className={'cart-total-details'}>
                                <p>Delivery Fee</p>
                                <p>${2}</p>
                            </div>
                            <hr/>
                            <div className={'cart-total-details'}>
                                <b>Total</b>
                                <b>${getTotalCartAmount()+2}</b>
                            </div>
                        </div>
                        <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
                    </div>
                    <div className={'cart-promo-code'}>
                        <div>
                            <p>If you have a promo code, Enter it here.</p>
                            <div className={'cart-promo-code-input'}>
                                <input type={"text"} placeholder={'promo code'}/>
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        </div>

    )
}