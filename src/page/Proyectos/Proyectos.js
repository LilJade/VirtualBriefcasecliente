import React from 'react'
import "./Proyectos.scss"
import BasicLayout from "../../layout/BasicLayout";



export default function Proyectos(props) {
    const {setRefreshCheckLogin} = props;
    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
            <h2>Estamos en Proyectos</h2>
                </BasicLayout>
    )
}
