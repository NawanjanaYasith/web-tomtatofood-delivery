import './PlaceOlder.css'
import {useContext, useEffect, useState} from "react";
import storeContext, {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function PlaceOrder(){
    const {cartItems, food_list, removeFromCart,getTotalCartAmount,url,token} = useContext(StoreContext);
    const navigate=useNavigate();
    const[data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const placeOrder=async (event)=>{
        event.preventDefault();
        let orderItems=[];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo=item;
                itemInfo["quantity"]=cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData={
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+2,
        }
        let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}})
        if(response.data.success){
            const {session_url}=response.data;
            window.location.replace(session_url)
        }else{
            alert("Error")
        }
    }
    useEffect(() => {
        if(!token){
            navigate('/cart')
        }else if(getTotalCartAmount()===0){
            navigate('/cart')
        }
    }, []);
    return(
        <form  onSubmit={placeOrder} className={'place-order'}>
            <div className={'place-order-left'}>
                <p className={'title'}>Delivery Information</p>
                <div className={'multi-fields'}>
                    <input required type={"text"} placeholder={'First Name'} name={'firstName'} onChange={onChangeHandler} value={data.firstName}/>
                    <input type={"text"} placeholder={'Last Name'} name={'lastName'} onChange={onChangeHandler} value={data.lastName}/>
                </div>
                <input required type={"email"} placeholder={'Email Address'} name={'email'} onChange={onChangeHandler} value={data.email}/>
                <input required type={"text"} placeholder={'Street'} name={'street'} onChange={onChangeHandler} value={data.street}/>
                <div className={'multi-fields'}>
                    <input required type={"text"} placeholder={'City'} name={'city'} onChange={onChangeHandler} value={data.city}/>
                    <input required type={"text"} placeholder={'State'} name={'state'} onChange={onChangeHandler} value={data.state}/>
                </div>
                <div className={'multi-fields'}>
                    <input required type={"text"} placeholder={'Zipcode'} name={'zipcode'} onChange={onChangeHandler} value={data.zipcode}/>
                    <input required type={"text"} placeholder={'Country'} name={'country'} onChange={onChangeHandler} value={data.country}/>
                </div>
                <input required type={"number"} placeholder={'Phone'} name={'phone'} onChange={onChangeHandler} value={data.phone}/>
            </div>
            <div className={'place-order-right'}>
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
                    <button type={"submit"}>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}