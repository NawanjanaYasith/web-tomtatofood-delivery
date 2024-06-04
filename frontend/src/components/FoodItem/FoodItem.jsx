import './FoodItem.css'
import {assets} from "../../assets/assets.js";
import {useContext} from "react";
import {StoreContext} from "../../context/StoreContext.jsx";
export default function FoodItem({id,name,price,description,image}){

    const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
console.log("id---"+id);
    return(
        <div className={'food-item'}>
            <div className={'food-item-image-container'}>
                <img src={url+"/image/"+image} alt={''} className={'food-item-image'}/>
                {!cartItems[id]
                    ?<img className={'add'} src={assets.add_icon_white} onClick={()=>addToCart(id)} alt={''}/>
                    :<div className={'food-item-counter'}>
                        <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt={''}/>
                        <p>{cartItems[id]}</p>
                        <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt={''}/>
                    </div>
                }
            </div>
            <div className={'food-item-info'}>
                <div className={'food-item-name-rating'}>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt={""}/>
                </div>
                <p className={'food-item-desc'}>{description}</p>
                <p className={'food-item-price'}>${price}</p>
                <p></p>
            </div>
        </div>
    )
}