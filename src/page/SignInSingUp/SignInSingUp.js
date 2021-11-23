import React , {useState} from "react";
import {Container, Row, Col} from "react-bootstrap"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBriefcase, faTachometerAlt, faCompass} from "@fortawesome/free-solid-svg-icons"
import Logo from "../../assets/png/logo.png"
import "./SignInSingup.scss"
import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";


export default function SignInSingup(props){
    console.log(props)
    const {setRefreshCheckLogin} = props;
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openModal = content =>{
    setShowModal(true);
    setContentModal(content)
    };

    return(
       <> 
      <Container className="signin-signup" fluid>
          <div className="titulo">
          <h2>VIRTUAL</h2>
          <h1>BRIEFCASE</h1>
          </div>
          <Row>
            <ComponenteIzquierdo/>
            <ComponenteDerecho openModal ={openModal}
            setShowModal={setShowModal}
            setRefreshCheckLogin={setRefreshCheckLogin}
            />
          </Row>
      </Container>
            <BasicModal 
            show={showModal}
            setShow={setShowModal}
            >
                {contentModal}
                </BasicModal>
            </>
    )
}

function ComponenteIzquierdo(){
    return(
        <Col className="signin-signup__izquierdo" xs={6}> 
        <img src={Logo} alt="Imagen"></img>
        <div>
        <h2><FontAwesomeIcon icon={faBriefcase}/>La mejor forma de hacer un portafolio</h2>
        <h2><FontAwesomeIcon icon={faTachometerAlt}/>Rapido y sencillo</h2>
        <h2><FontAwesomeIcon icon={faCompass}/>Desde cualquier lugar</h2>
        </div>
        </Col>
    )
}
function ComponenteDerecho(props){
    const {openModal, setShowModal, setRefreshCheckLogin} =props
    return(
        <Col className="signin-signup__derecho" xs={6}>
        <div>
        <h1>¡BIENVENIDO!</h1>
        <SignInForm setRefreshCheckLogin={setRefreshCheckLogin}/>
       
             <h2>¿Aún no estas registrado?</h2>
             <a  onClick={ () => openModal(<SignUpForm setShowModal={setShowModal}/>)}> Regístrate aquí</a>
        </div>
        </Col>
    )
}