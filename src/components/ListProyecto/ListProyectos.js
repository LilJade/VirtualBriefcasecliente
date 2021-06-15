import React,{useEffect, useState} from 'react'
import "./ListProyectos.scss"
import {Image, Media} from "react-bootstrap";
import {Link} from "react-router-dom"
import {map} from "lodash";
import moment from "moment";

export default function ListProyectos(props) {

    const {proyectos} = props;
    return (
        <div>
            {map(proyectos, (proyecto, index) =>(
              <Proyecto key={index} proyecto={proyecto} />
            ))}
        </div>
    )
}
function Proyecto(props){
    const {proyecto}  = props
    return(
        <Media as ={Link} to={`/Proyectos/${proyecto?._id}`} className="proyect">
            <h2>{proyecto.titulo}</h2>
            <Image className="portada" />
            <h3>{proyecto.empresa}</h3>
             <p>{proyecto.descripcion}</p>
             <span>{moment(proyecto.fecha).calendar()}</span>
             </Media>
    ) 
}
