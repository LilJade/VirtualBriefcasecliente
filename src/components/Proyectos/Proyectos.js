import React, {useState} from 'react'
import "./Proyectos.scss"
import {Button} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import ProyectoModal from "../Modal/ProyectoModal"

export default function Proyectos(props) {
    const [showModal, setShowModal] = useState(false)
    const { loggedUsers, user} = props;
    return (
        <div className="proyectos">
            <h2 align="center" >Mis Proyectos</h2> 
            
            
            {user && (
            <div>
                 {loggedUsers._id === user.id &&  <Button className="agregar" onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlusSquare}/> </Button>}
            </div>
             )}
            <ProyectoModal show={showModal} setShow={setShowModal} />
        </div>
    )
}
