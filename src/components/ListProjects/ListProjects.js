import React, {useState, useEffect} from 'react'
import "./ListProjects.scss"
import { Image, Media } from 'react-bootstrap'
import {map} from "lodash"
import {getUserApi} from  "../../api/user"
import AvatarNoFound from "../../assets/png/Perfil.png"
import { API_HOST } from '../../utils/constant'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function ListProjects(props) {
    const {proyectos} = props
    return (
        <div className ="lista-proyectss">
            {map(proyectos, (proyecto, index) => (
                   
              <Proyecto key ={index} proyecto={proyecto} />
            ))}
        </div>
    )
}

function Proyecto(props){
    const {proyecto } = props;
    const [userInfo, setUserInfo] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
       getUserApi(proyecto.userId).then(response =>{
           setUserInfo(response)
           setAvatarUrl(
            response?.avatar 
            ? `${API_HOST}/obtenerAvatar?id=${response.id}` :  AvatarNoFound
        )
       })
    }, [proyecto])
    return(
        <Media as ={Link} to={`/Proyectos/${proyecto._id}`} className ="project">
        <Image 
        width={64}
        height={64}
        className="avatars" src={avatarUrl} roundedCircle/>
        <div>
            <div className="name">
                {userInfo?.nombre } {userInfo?.apellidos }
                <span>{moment(proyecto.fecha).calendar()}</span>
            </div>
            <div>
            {proyecto.titulo}
            </div>
        </div>
        </Media>
        
    ) ;
}