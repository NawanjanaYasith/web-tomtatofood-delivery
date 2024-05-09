import './Navbar.css'
import {assets} from "../../assets/assets.js";
import {useState,useEffect} from "react";
import {Link} from "react-router-dom";

export default function Navbar(){
    const [menu,setMenu]=useState("menu");
   
    return(
        <div className={'navbar'}>
            <img src={assets.logo} alt={''} className={'logo'}/>
            <ul className={'navbar-menu'}>
                <Link to={'/home'}><li onClick={()=>{setMenu("home")}} className={menu==="home" ? "active":""}>home</li></Link>
                <li onClick={()=>{setMenu("menu")}} className={menu==="menu" ? "active":""}>menu</li>
                <li onClick={()=>{setMenu("mobile-app")}} className={menu==="mobile-app" ? "active":""}>mobile-app</li>
                <li onClick={()=>{setMenu("contact-us")}} className={menu==="contact-us" ? "active":""}>contact-us</li>
            </ul>
            <div className={'navbar-right'}>
                <img src={assets.search_icon} alt={''}/>
                <div className={'navbar-search-icon'}>
                    <img src={assets.basket_icon} alt={''}/>
                    <div className={'dot'}></div>
                </div>
                <button>Sign in</button>
            </div>
        </div>
    )
}