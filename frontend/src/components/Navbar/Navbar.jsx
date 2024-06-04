import './Navbar.css'
import {assets} from "../../assets/assets.js";
import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {StoreContext} from "../../context/StoreContext.jsx";

export default function Navbar({setShowLogin}){
    const [menu,setMenu]=useState("home");
    const {getTotalCartAmount,setToken,token}=useContext(StoreContext)
    const navigate=useNavigate();

    const logOut=()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate('/home')
    }
    return(
        <div className={'navbar'}>
            <Link to={'/home'}><img src={assets.logo} alt={''} className={'logo'}/></Link>
            <ul className={'navbar-menu'}>
                <Link to={'/'}><li onClick={()=>{setMenu("home")}} className={menu==="home" ? "active":""}>home</li></Link>
                <a href={'#explore-menu'} onClick={()=>{setMenu("menu")}} className={menu==="menu" ? "active":""}>menu</a>
                <a href={'#app-download'} onClick={()=>{setMenu("mobile-app")}} className={menu==="mobile-app" ? "active":""}>mobile-app</a>
                <a href={'#footer'} onClick={()=>{setMenu("contact-us")}} className={menu==="contact-us" ? "active":""}>contact-us</a>
            </ul>
            <div className={'navbar-right'}>
                <img src={assets.search_icon} alt={''}/>
                <div className={'navbar-search-icon'}>
                    <Link to={'/cart'}><img src={assets.basket_icon} alt={''}/></Link>
                    <div className={getTotalCartAmount()===0 ? "":"dot"}></div>
                </div>
                {!token ? <button onClick={()=>setShowLogin(true)}>Sign in</button>:
                    <div className={'navbar-profile'}>
                        <img src={assets.profile_icon} alt={''}/>
                        <ul className={'nav-profile-dropdown'}>
                            <li><img src={assets.bag_icon} alt={''}/>Orders</li>
                            <hr/>
                            <li onClick={logOut}><img src={assets.logout_icon} alt={''}/>Logout</li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}