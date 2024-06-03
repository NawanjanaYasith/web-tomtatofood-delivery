import './Sidebar.css'
import add_icon from '../../assets/add_icon.png'
import order_icon from '../../assets/order_icon.png'
import {Link, NavLink} from "react-router-dom";

export default function Sidebar(){
    return(
        <div className={'sidebar'}>
            <div className={'sidebar-options'}>
                <NavLink to={'/add'} className={'sidebar-option'}>
                   <img className={'add-icon'} src={add_icon} alt={''}/>
                    <p>Add Items</p>
                </NavLink>
                <NavLink to={'/list'} className={'sidebar-option'}>
                    <img className={'list-icon'} src={order_icon} alt={''}/>
                    <p>List Items</p>
                </NavLink>
                <NavLink to={'/order'} className={'sidebar-option'}>
                    <img className={'list-icon'} src={order_icon} alt={''}/>
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}