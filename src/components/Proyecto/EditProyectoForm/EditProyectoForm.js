import React, {useCallback, useState} from 'react'
import "./EditProyectoForm.scss"
import {Form, Button, Row, Col, Spinner} from "react-bootstrap"
import {useDropzone} from "react-dropzone"
import {API_HOST} from "../../../utils/constant"
import {Camara} from "../../../utils/Icons"
import {uploadPortadaApi, updateInfoProyectoApi} from "../../../api/proyecto";
import Swal from 'sweetalert2';

export default function EditProyectoForm(props) {

    const {proyecto, setShow} = props
    const [formData, setFormData] = useState(initialValue(proyecto))
    const [portadaURL, setPortadaURL] = useState(proyecto?.portada ? `${API_HOST}/getPortada?id=${proyecto.id}` : null)
    const [portadaFile, setPortadaFile] = useState(null)
    const [loadin, setLoadin] = useState(false)
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropPortada = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setPortadaURL(URL.createObjectURL(file));
        setPortadaFile(file);
        
    })
    const {getRootProps: getRootPortada, getInputProps:getInputPortada} = useDropzone({
        accept: "image/jpeg, image/png ",
        noKeyboard: true,
        multiple:false,
        onDrop: onDropPortada
    })

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        setLoadin(true)
        e.preventDefault();
       if(portadaFile){
        await uploadPortadaApi(portadaFile, proyecto.id).catch(() =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error al subir imagen'
              })
          })
       }

       await updateInfoProyectoApi(formData).then(() => {
        setShow(false);
    }).catch(()=>{
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al actualizar los datos del proyecto'
        })
    })
    setLoadin(false)
    window.location.reload();
    }


    return (
        <div className="edit-Project-form">
            <div className="portada" style={{ backgroundImage:`url('${portadaURL}')`}}
            {...getRootPortada()}
            >
                <input {...getInputPortada()}/>
                <Camara/>
            </div>
            <Form onSubmit={onSubmit} onChange={onChange}> 
            <Form.Group>
            <Form.Control type="hidden" name="id" defaultValue={formData.id}/>
                <span>Titulo</span>
                <Form.Control type="text" placeholder="Titulo" name="titulo" defaultValue={formData.titulo}/>
            </Form.Group>
            <Form.Group>
            <span>Empresa</span>
                <Form.Control type="text" placeholder="Empresa" name="empresa" defaultValue={formData.empresa}/>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                    <span>GitHub</span>
                    <Form.Control type="text" placeholder="GitHub" name="github" defaultValue={formData.github}/>
                    </Col>
                    <Col>
                    <span>Pagina Web</span>
                    <Form.Control type="text" placeholder="Pagina Web" name="sitioWeb" defaultValue={formData.sitioWeb}/>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
            <span>Descripcion</span>
                <Form.Control as="textarea" 
                rows="2"
                type="text" placeholder="Descripcion" name="descripcion" defaultValue={formData.descripcion}/>
            </Form.Group>

            <Button className="btn-submit" variant="primary" type="submit">
            {loadin && <Spinner animation="border" size="sm"/>}
            Actualizar
            </Button>
            </Form>
        </div>
    )
}


function initialValue(proyecto){
    return{
        id: proyecto.id || "",
        titulo: proyecto.titulo || "",
        empresa: proyecto.empresa || "",
        descripcion: proyecto.descripcion || "",
        github: proyecto.github || "",
        sitioWeb: proyecto.sitioWeb || ""
    }
}
