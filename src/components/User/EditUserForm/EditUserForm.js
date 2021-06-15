import React, {useState, useCallback} from 'react'
import "./EditUserForm.scss"
import {Form, Button, Row, Col, Spinner} from "react-bootstrap"
import DatePicker from "react-datepicker"
import es from "date-fns/locale/es"
import {useDropzone} from "react-dropzone"
import{API_HOST} from "../../../utils/constant"
import {Camara} from "../../../utils/Icons"
import {uploadAvatarApi, updateInfoApi} from "../../../api/user"
import Swal from 'sweetalert2';


export default function EditUserForm(props) {
    const {user, setShowModal} =props
    const [formData, setFormData] = useState(initialValue(user))
    const   [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : null
    )   
    const [loading, setLoading] = useState(false);

        const [avatarFile, setAvatarFile] = useState(null)                               
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const onDropAvatar = useCallback(acceptedFile =>{
            const file= acceptedFile[0];
            setAvatarUrl(URL.createObjectURL(file));
            setAvatarFile(file);
        })

        const {getRootProps:getRootAvatarProp, getInputProps:getInputAvatarProp} = useDropzone({
            accept: "image/jpeg, image/png",
            noKeyboard: true,
            multiple:false,
            onDrop: onDropAvatar
        })
    const onChange = e =>{
        setFormData( {...formData, [e.target.name]: e.target.value})
    }

    const onSubmit= async (e) =>{
        e.preventDefault();
        setLoading(true)

       if(avatarFile){
         await uploadAvatarApi(avatarFile).catch(()=> {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al subir imagen'
              });
           })
       }

       await updateInfoApi(formData)
       .then(() =>{
        setShowModal(false);
       }).catch(() =>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al Actualizar datos'
          });
       });

       setLoading(false);
       window.location.reload();
    }



    return (
     <div className="edit-user-form">

         <div className="avatar"
         style={{backgroundImage:`url('${avatarUrl}')`}}
         {...getRootAvatarProp()}
         >
             <input {...getInputAvatarProp()}/>
             <Camara/>
         </div>
         <Form onSubmit={onSubmit} >
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control type="text" placeholder="Nombre" name="nombre" defaultValue={formData.nombre} onChange={onChange}/>
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="Apellidos" name="apellidos" defaultValue={formData.apellidos} onChange={onChange}/>
                    </Col>
                </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Control type="text" placeholder="Profesion" name="profesion" defaultValue={formData.profesion} onChange={onChange}/>
                        </Col>
                        <Col>
                        <Form.Control type="text" placeholder="Direccion" name="direccion" defaultValue={formData.direccion} onChange={onChange}/>
                        </Col>
                        <Col>
                            <DatePicker placeholder="Fecha de nacimiento"
                            locale={es}
                            selected={new Date(formData.fechaNacimiento)}
                            onChange={value => setFormData({ ...formData, fechaNacimiento: value})}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Control type="text" placeholder="Facebook" name="facebook" defaultValue={formData.facebook} onChange={onChange}/>
                        </Col>
                        <Col>
                        <Form.Control type="text" placeholder="Twitter" name="twitter" defaultValue={formData.twitter} onChange={onChange}/>
                        </Col>
                        <Col>
                        <Form.Control type="text" placeholder="Instagram" name="instagram" defaultValue={formData.instagram} onChange={onChange}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" row="3" placeholder="Agrega tu biografia" type="text" name="biografia" defaultValue={formData.biografia} onChange={onChange}/>
                </Form.Group>
                <Button className="btn-submit" variant="primary" type="submit">
                    {loading && <Spinner animation="border" size="sm"/>}
                     Actualizar</Button>
           
         </Form>
     </div>
    )
}

function initialValue(user){

    return{
        nombre: user.nombre || "",
        apellidos: user.apellidos || "",
        profesion: user.profesion || "",
        direccion: user.direccion || "",
        fechaNacimiento: user.fechaNacimiento || "",
        facebook: user.facebook || "",
        twitter: user.twitter || "",
        instagram: user.instagram || "",
        biografia: user.biografia || ""
    }

}