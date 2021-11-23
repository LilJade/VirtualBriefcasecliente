import React from 'react'
import "./Menu.scss";
import { Container } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome,faUser,faProjectDiagram, faPowerOff, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Logo from "../../assets/png/logo1.png"
import {logoutApi} from "../../api/auth"
import useAuth from "../../hooks/useAuth";

export default function Menu(props) {
    const {setRefreshCheckLogin} = props
    const user  = useAuth();
    const logout = ()=>{
        logoutApi();
        setRefreshCheckLogin(true);
    }

    return (
        <Container className="menu">
           <img className ="logo" src={Logo} alt ="virtual"/>
           <Link to="/"> 
            <FontAwesomeIcon icon={faHome}/>
           Inicio</Link>
           <Link to="/Proyectos"> <FontAwesomeIcon icon={faProjectDiagram}/>Proyectos</Link>
           <Link to="/Users"> <FontAwesomeIcon icon={faUsers}/>Usuarios</Link>
         
         <Link to={`/${user?._id}`}> <FontAwesomeIcon icon={faUser}/>Perfil</Link>
         <Link to="" onClick={logout}> <FontAwesomeIcon icon={faPowerOff}/>Cerrar sesión</Link>
        </Container>
    )
}
