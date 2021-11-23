import React from 'react'
import "./ListProyecto.scss"
import {Image, Media,Row, } from "react-bootstrap";
import {Link} from "react-router-dom"
import {map} from "lodash";
import moment from "moment";
import {API_HOST} from "../../utils/constant";
import portadaNoFound from "../../assets/png/sin_foto.png"
export default function ListProyecto(props) {

    const {proyectos} = props;
    return (
        <div className="proyects"> 
            <Row  md={4}>
            {map(proyectos, (proyecto, index) =>(
                
              <Proyecto key={index} proyecto={proyecto} />
              
            ))}
            </Row>
        </div>
    )
}
function Proyecto(props){
    const { proyecto}  = props
    return(   
            <Media as ={Link} to={`/Proyectos/${proyecto?._id}`} className="proyectl">
            <h2>{proyecto.titulo}</h2>
            <Image 
            src={
                proyecto?.portada 
                ? `${API_HOST}/getPortada?id=${proyecto._id}`: portadaNoFound
            }
            alt ={proyecto.titulo}
            className="portadas" />
            <h3>{proyecto.empresa}</h3>
             <p>{proyecto.descripcion}</p>
             <h4>{moment(proyecto.fecha).calendar()}</h4>
             </Media> 
    ) 
}
