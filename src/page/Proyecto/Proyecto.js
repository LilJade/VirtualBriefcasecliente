import React,{useState, useEffect} from 'react'
import "./Proyecto.scss"
import BasicLayout from "../../layout/BasicLayout"
import {withRouter}from "react-router-dom"
import {getProyectoApi} from "../../api/proyecto"
import Swal from 'sweetalert2';
import Portada from "../../components/Proyecto/Portada"
import useAuth from "../../hooks/useAuth"
import InfoUser from "../../components/Proyecto/InfoProyecto"

function Proyecto(props) {
    const{setRefreshCheckLogin, match} = props
    const [proyecto, setProyecto] = useState(null)
    const {params} = match;
    const loggedUser= useAuth()
    
    
    useEffect(() => {
      getProyectoApi(match.params.id).then(response =>{
        if(!response){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El Proyecto que has visitado no existe'
              })
           }
           setProyecto(response);
        }).catch(() =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El Proyecto que has visitado no existe'
              })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    
    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className="proyecto">
            <div className = "proyecto__title">
            <h2>{proyecto ? `${proyecto.titulo}` : "Este Proyecto no existe"}</h2>
            </div>
            <Portada proyecto={proyecto} loggedUser={loggedUser}/>
            <InfoUser proyecto={proyecto}/>
            <div>fotos</div>
        </BasicLayout>
    )
}

export default withRouter(Proyecto)