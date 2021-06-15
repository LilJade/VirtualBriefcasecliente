import React, {useState, useEffect} from 'react'
import "./User.scss"
import {Button, Spinner, Row, Col} from "react-bootstrap"
import BasicLayout from "../../layout/BasicLayout";
import {withRouter} from "react-router-dom"
import {getUserApi } from '../../api/user';
import useAuth from "../../hooks/useAuth"
import Swal from 'sweetalert2';
import Avatar from "../../components/User/Avatar"
import InfoUser from "../../components/User/InfoUser";
import Biografia from "../../components/User/Biografia";
import Proyectos from '../../components/Proyectos';
import ListProyecto  from '../../components/ListProyecto';
import {getUserProyectoApi} from "../../api/proyecto"

 function User(props) {
    const {match,setRefreshCheckLogin} = props;
    const [user, setUser] = useState(null);
    const {params} = match;
    const [proyectos, setProyectos] = useState(null)
    const loggedUsers = useAuth();

    

    useEffect(() => {
        getUserApi(params.id).then(response =>{
           if(!response){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario que has visitado no existe'
              })
           }
           setUser(response);
        }).catch(() =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario que has visitado no existe'
              })
        })
    }, [params])
  
  useEffect(() => {
    getUserProyectoApi(params.id,1)
    .then(response =>{
        setProyectos(response)
    })
    .catch(() => {
        setProyectos([])
    })
  }, [params])
  
    return (
        <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
                 <div className="user__datos">
                     <Row>
                     <Col>
            <div className="user__title">
                <Avatar user={user} loggedUsers={loggedUsers}/>
                <InfoUser user={user}/>
            </div>
            </Col>
            <Col>
            <div className="user__info">
                 <Biografia user={user}/>
            </div>
            </Col>
            </Row>
            </div>
            <div className="user__ProyectosHead">
             <Proyectos user={user} loggedUsers={loggedUsers}/>
            </div>
            <div className="user__Proyectos">
            {proyectos && <ListProyecto proyectos={proyectos}/>}
            </div>
        </BasicLayout>
    )
}

export default withRouter(User);