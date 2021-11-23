import React, {useEffect, useState} from 'react'
import "./Portada.scss"
import ConfigModal from  "../../Modal/ConfigModal"
import {API_HOST} from "../../../utils/constant"
import {Button, ButtonGroup} from "react-bootstrap"
import {getUserApi} from "../../../api/user"
import {DeleteProyecto} from "../../../api/proyecto"
import EditProyectoForm from "../../../components/Proyecto/EditProyectoForm"
import Swal from 'sweetalert2'
export default function Portada(props) {
    const {proyecto, loggedUser} = props     
    const [user, setUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
   console.log(proyecto)
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

    const Eliminar = () =>{
        Swal.fire({
            title: 'Estas Seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El proyecto fue eliminado.',
                'success'
              )
              DeleteProyecto(proyecto.id).then(response =>{
                Location.reload()
             });
            }
          })
    }
      
    return (
        <div className ="portada"
        style={{backgroundImage: `url('${portadaURL}')`}}
        >
        {user &&(
            <div className ="options">
                <ButtonGroup aria-label="Basic example">
                {loggedUser._id === proyecto.userid && <Button onClick={() => setShowModal(true)}> Editar Proyecto</Button>}
                {loggedUser._id === proyecto.userid && <Button className="eliminar" onClick={() => Eliminar()}> Eliminar</Button>}
                </ButtonGroup>
     </div>
        )}
        <ConfigModal show={showModal} setShow={setShowModal} title="Editar Proyecto">
            <EditProyectoForm proyecto={proyecto} setShow={setShowModal} />
        </ConfigModal>
        </div>
    )
}
