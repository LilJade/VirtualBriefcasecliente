import React from 'react'
import "./InfoProyecto.scss"
import {Github, Publicado, Link} from "../../../utils/Icons" 
import localization from "moment/locale/es"
import moment from 'moment';



export default function InfoProyecto(props) {
    const {proyecto} = props;
    return (
        <div className="info-Proyecto">
          <h2 className="titulos">Proyecto: {proyecto?.titulo}</h2>
          <p className="empresa">Empresa: {proyecto?.empresa}</p>
          {proyecto?.descripcion &&(
              <div className="descripcion">
                    Descripcion: {proyecto?.descripcion}
                  </div>
          )}
            <div className="more-info"> 
                {proyecto?.github &&(
                    <p><Github/>
                      Github: <a 
                      href={proyecto.github}
                       alt={proyecto.github}
                        target="_blank" rel="noopener noreferrer">
                            {proyecto.github}</a> 
                    </p>
                )}
                {proyecto?.sitioWeb &&(
                    <p><Link/>
                      Sitio Web: <a 
                      href={proyecto.sitioWeb}
                       alt={proyecto.sitioWeb}
                        target="_blank" rel="noopener noreferrer">
                            {proyecto.sitioWeb}</a> 
                    </p>
                )}
                 {proyecto?.fecha &&(
                    <p><Publicado/>
                      Creado: {moment(proyecto.fecha).locale("es", localization).format("LL")}
                    </p>
                )}
                 </div>
                  </div>
    )
}
