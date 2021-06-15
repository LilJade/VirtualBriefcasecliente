import React from 'react'
import "./InfoUser.scss"
import {Location,DataBirth,SuitCase} from "../../../utils/Icons"
import moment from "moment";
import localization from "moment/locale/es-mx"

export default function InfoUser(props) {

    const {user} =props;
    return (
        <div className="info-user">
        <h2 className="name">
            {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"} 
            </h2>
            <div className="info">
            
            {user?.profesion &&(
                <p>
                    <SuitCase/>
                    {user.profesion}
                </p>
            )}

            {user?.direccion &&(
                <p>
                    <Location/>
                    {user.direccion}
                </p>
            )}

            {user?.fechaNacimiento &&(
                <p>
                    <DataBirth/>
                    {moment(user.fechaNacimiento).locale("es", localization).format('LL')}
                </p>
            )} 
            </div>
        </div>
    )
}
