import React, {useState} from 'react'
import {Modal, Form, Button, Row, Col} from "react-bootstrap";
import "./ProyectoModal.scss"
import {Close} from "../../../utils/Icons";
import classNames from "classnames"
import {addProyectoApi} from "../../../api/proyecto"
import Swal from 'sweetalert2';
export default function ProyectoModal(props) {
    const {show, setShow} = props;
    const [titulos, setTitulos] = useState("")
    const maxLength = 50;
    const [formData, setFormData] = useState(initialValue())
    

    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    };
    const onSubmit = (e) =>{
        e.preventDefault();
       if(titulos.length > 0 && titulos.length <= maxLength){
        addProyectoApi(formData)
        .then(response =>{
            if(response?.code >=200 && response?.code <300){
                Swal.fire({
                    icon: 'success',
                    title: 'Genial',
                    text: response.message
                  })
                  setShow(false);
                  window.location.reload()
            }
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error del servidor, intenlo mas tarde'
              })
        })
       }
    }

    return (
         <Modal className="proyecto-modal"
         show={show}
         onHide={() => setShow(false)}
         centered
         size="lg">
            <Modal.Header>
                <Modal.Title>
                <Close onClick={() => setShow(false)} />
                <h2>Proyecto nuevo</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form onSubmit={onSubmit} onChange={onChange}>
                            <Form.Control type="text" onChange={e =>  setTitulos(e.target.value)} placeholder="Titulo" name="titulo" defaultValue={formData.titulo}/>
                            <span className={classNames("count", {error:titulos.length>maxLength })}>{titulos.length}</span>
                            <Form.Control type="text" placeholder="Empresa" name="empresa" defaultValue={formData.empresa} />
                            <Row>
                                <Col>
                                <Form.Control type="text" placeholder="GitHub" name="github" defaultValue={formData.github} />
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="Sitio Web" name="sitioWeb" defaultValue={formData.sitioWeb} />
                                </Col>
                            </Row>
                    <Form.Control as="textarea" rows="2" type="text" placeholder="Descripcion del proyecto" name="descripcion" defaultValue={formData.descripcion} />
                
                    <Button 
                    disabled={titulos.length>maxLength || titulos.length < 1}
                    type="submit">Agregar</Button>
                    </Form>
            </Modal.Body>
         </Modal>
    )
}
function initialValue(){
    return{
        titulo: "",
        empresa: "",
        descripcion: "",
        github: "",
        sitioWeb: ""
    }
}