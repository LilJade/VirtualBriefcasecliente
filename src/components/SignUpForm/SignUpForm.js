import React, {useState} from 'react'
import {Row,Col, Form,Button,Spinner} from "react-bootstrap";
import "./SignUpForm.scss";
import Swal from 'sweetalert2';
import {values, size} from "lodash";
import {isEmailValid} from "../../utils/validations";
import {signUpApi} from "../../api/auth";

export default function SignUpForm(props) {

    const{setShowModal}= props;
    const[formData, setFormData]= useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false)
    
    const onSubmit = e =>{
        e.preventDefault();

        let validCount = 0;
        values(formData).some(value =>{
            value && validCount++;
            return null;
        });

        if(size(formData) !== validCount){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Completa todos los datos del formulario'
              })
        }else{
            if(!isEmailValid(formData.email)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'email invalido'
                  })
            }else if (formData.password !== formData.repetir){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'las contraseñas tienen que coincidir'
                  })
            }else if (size(formData.password)<6){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'la contraseña tiene que tener al menos 6 caracteres'
                  })
            }else{
                setSignUpLoading(true);
                signUpApi(formData).then(response=>{
                    if(response.code){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.message
                          });
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: 'Datos correctos',
                            text:  'Datos Guardados correctamente',
                            timer: 1000
                          });
                          setShowModal(false);
                          setFormData(initialFormValue);

                    }
                })
                .catch( ( ) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error del servidor'
                      });
                })
                .finally(() =>{
                    setSignUpLoading(false);
                })
            }
        }
    };

    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>

            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control
                            type="text" placeholder="Nombres"
                            defaultValue={formData.nombre}
                            name="nombre"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text" placeholder="Apellidos"
                            defaultValue={formData.apellidos}
                            name="apellidos"
                        />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group>
            <Form.Control
                            type="email" placeholder="Correo electronico"
                            name="email"  defaultValue={formData.email}
                        />
            </Form.Group>

            <Form.Group>
                 <Row>
                     <Col>
                     <Form.Control
                            type="password" placeholder="Contraseña "
                            name="password" defaultValue={formData.password}
                        />
                     </Col>
                     <Col>
                     <Form.Control
                            type="password" placeholder="Repetir Contraseña"
                            name="repetir" defaultValue={formData.repetir}
                        />
                     </Col>
                 </Row>
            </Form.Group>
            <Button variant="danger" type="submit">
                {!signUpLoading ? "Registrarse" : <Spinner animation="border"/>}
            </Button>
            </Form>
        </div>
    )
}

function initialFormValue(){
    return {
        nombre:"",
        apellidos:"",
        email:"",
        password:"",
        repetir:""
    };
}