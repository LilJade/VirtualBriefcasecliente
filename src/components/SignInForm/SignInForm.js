import React, {useState} from 'react'
import "./SignInForm.scss";
import {Form, Button, Spinner} from "react-bootstrap";
import {values, size} from "lodash";
import Swal from 'sweetalert2';
import {isEmailValid } from "../../utils/validations";
import {signInApi, setTokenApi} from "../../api/auth";

export default function SignInForm(props) {
    const { setRefreshCheckLogin}=props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signInLoading, setSignInLoading] = useState(false)
    
    const onSubmit = e => {
        e.preventDefault();
        let validCount = 0;
        values(formData).some(value=>{
            value && validCount++
            return null;
        })

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
            }else{
                setSignInLoading(true);
                signInApi(formData).then(response =>{
                    if(response.message){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.message
                          })
                    }else{
                        setTokenApi(response.token);
                        setRefreshCheckLogin(true);
                    }
                }).catch(() =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'error del servidor, intenlo mas tarde'
                      })
                }).finally(() =>{
                    setSignInLoading(false);
                })
            }
        }
    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    return (
        <div className="sign-in-form">
           <Form onSubmit={onSubmit} onChange={onChange}>
               <Form.Group>
                   <h3>Correo electrónico</h3>
                   <Form.Control
                   defaultValue={formData.email}
                   name ="email"
                   type="email"
                   placeholder="Ejemplo@some.com"/>
               </Form.Group>
               <Form.Group>
                 <h3>Contraseña</h3>
                   <Form.Control
                   defaultValue={formData.password}
                   name ="password"
                   type="password"
                   placeholder="**********"/>
               </Form.Group>
               <Button variant="danger" type="submit">
                   {!signInLoading ? "Iniciar Sesión" : <Spinner animation="border"/>}
               </Button>
           </Form>
        </div>
    )
}

function initialFormValue(){
    return{
        email:"",
        password:""
    }


}