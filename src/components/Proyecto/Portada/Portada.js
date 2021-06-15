import React, {useEffect, useState} from 'react'
import "./Portada.scss"
import ConfigModal from  "../../Modal/ConfigModal"
import {API_HOST} from "../../../utils/constant"
import {Button} from "react-bootstrap"
import {getUserApi} from "../../../api/user"
import EditProyectoForm from "../../../components/Proyecto/EditProyectoForm"

export default function Portada(props) {
    const {proyecto, loggedUser} = props     
    const [user, setUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
   
    useEffect(() => {
        getUserApi(proyecto ? proyecto.userid : "")
        .then(response =>{
            setUser(response)
        })
        .catch(() => {
            setUser([])
        })
      }, [proyecto])
    
    const portadaURL = proyecto?.portada ? `${API_HOST}/getPortada?id=${proyecto.id}` : null;

    return (
        <div className ="portada"
        style={{backgroundImage: `url('${portadaURL}')`}}
        >
        {user &&(
            <div className ="options">
                {loggedUser._id === proyecto.userid && <Button onClick={() => setShowModal(true)}> Editar Proyecto</Button>}
               
            </div>
        )}
        <ConfigModal show={showModal} setShow={setShowModal} title="Editar Proyecto">
            <EditProyectoForm proyecto={proyecto} setShow={setShowModal} />
        </ConfigModal>
        </div>
    )
}
