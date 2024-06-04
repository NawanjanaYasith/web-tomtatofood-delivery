import './LoginPopup.css'
import {useContext, useState} from "react";
import {assets} from "../../assets/assets.js";
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
export default function LoginPopup({setShowLogin}){

    const {url,setToken}=useContext(StoreContext)
    const [currentState,setCurrentState]=useState("Login")
    const[data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChnageHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin=async (event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currentState==="Login"){
            newUrl+="/api/user/login"
        }else{
            newUrl+="/api/user/register"
        }
        const response=await axios.post(newUrl,data);

        if (response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false);
        }else{
            alert(response.data.message)
        }
    }
    return(
        <div className={'login-popup'}>
            <form onSubmit={onLogin} className={'login-popup-container'}>
                <div className={'login-popup-title'}>
                    <h2>{currentState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt={''}/>
                </div>
                <div className={'login-popup-inputs'}>
                    {currentState==="Login" ? <></>:
                        <input type={"text"} placeholder={'your name'} name={'name'} onChange={onChnageHandler} value={data.name} required/>}
                        <input type={"email"} placeholder={'your email'} name={'email'} onChange={onChnageHandler} value={data.email} required/>
                        <input type={"password"} placeholder={'your password'} name={'password'} onChange={onChnageHandler} value={data.password} required/>
                </div>
                <button type={"submit"}>{currentState==="Sign Up" ? "Creat Account":"Login"}</button>
                <div className={'login-popup-condition'}>
                    <input type={"checkbox"} required/>
                    <p>By continuing , i agree to the terms of use and privacy policy</p>
                </div>
                {currentState==="Login" ? <p>Create a new account <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
                    :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}