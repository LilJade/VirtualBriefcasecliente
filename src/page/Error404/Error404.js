import React from 'react'
import "./Error404.scss";
import { Link} from "react-router-dom"
import  Errors404 from "../../assets/png/error-404.png"



export default function Error404() {
    return (
        <div className="error404"> 
            <img src={Errors404} alt="Error404"/>
            <Link to="/">Volver al inicio</Link>
        </div>
    )
}
