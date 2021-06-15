import React from 'react'
import "./Biografia.scss"
import {Col,Row,Container} from "react-bootstrap"
import {Facebook,Twitter,Instagram,Correo} from "../../../utils/Icons"


export default function Biografia(props) {
    const {user} = props;
    
    return (
        <div className="biografia-data">
            <Container>
            <Row>
            <Col>
                <div className ="redes">
                     <h2> Mis Redes Sociales</h2>
                     <h3>¡Contáctame!</h3>
                        <div className="datos">
                     {user?.facebook &&(
                         <p>
                             <Facebook/>
                            {user.facebook}
                         </p>
                     )}
                     
                     {user?.twitter &&(
                         <p>
                             <Twitter/>
                        {user.twitter}
                         </p>
                     )}
                     
                     {user?.instagram &&(
                         <p>
                             <Instagram/>
                          {user.instagram}
                         </p>
                     )}
                     
                     {user?.email &&(
                         <p>
                         <Correo/> {user.email}
                         </p>
                     )}
                     </div>
                </div>
            </Col>
            <Col>
                <div className ="herramientas">
                <h2> Mis Herramientas</h2>
                </div>
            </Col>
            </Row>
            <Row>
                <div className="biografia">
                <h2> Biografía</h2> 
                {user?.biografia &&(
                         <p>
                        {user.biografia}
                         </p>
                     )}
                </div>
            </Row>   
            </Container>
        </div>
    )
}
