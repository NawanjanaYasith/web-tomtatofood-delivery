import {useState} from 'react'
import './App.css'
import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Add from "../pages/Add/Add.jsx";
import Order from "../pages/Order/Order.jsx";
import List from "../pages/List/List.jsx";
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
function App() {
    const url="http://localhost:4000"

    return (
        <div>
            <ToastContainer/>
            <Navbar/>
            <hr/>
            <div className={'app-content'}>
                <Sidebar/>
                <Routes>
                    <Route path="*" element={<Navigate to="/add"/>}/>
                    <Route path={'/add'} element={<Add url={url}/>}/>
                    <Route path={'/list'} element={<List url={url}/>}/>
                    <Route path={'/order'} element={<Order url={url}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
