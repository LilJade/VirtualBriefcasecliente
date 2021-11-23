import React, {useEffect, useState} from 'react'
import "./Proyectos.scss"
import BasicLayout from "../../layout/BasicLayout";
import { getProyectosSeguidores} from "../../api/proyecto"
import ListProjects from "../../components/ListProjects"
import { Button, Spinner } from 'react-bootstrap';
export default function Proyectos(props) {
    const {setRefreshCheckLogin} = props;
    const [proyectos, setProyectos] = useState(null)
    const [page, setPage] = useState(1)
    const [loadingProyectos, setLoadingProyectos] = useState(false)


    useEffect(() => {
      getProyectosSeguidores(page).then(response =>{
          if(!proyectos && response){
            setProyectos(formatModal(response))
          }else{
            if(!response){
                setLoadingProyectos(0)
            }else{
                const data = formatModal(response)
                setProyectos([...proyectos, ...data])
                setLoadingProyectos(0)
            }
            
          }
      }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const moreData = () =>{
        setLoadingProyectos(true)
        setPage(page+1)
    }

    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className="proyectos">
            <div className="proyectoss__title">
            <h2>Proyectos</h2>
            </div>
            {proyectos &&  <ListProjects proyectos={proyectos}/>}
                <Button onClick={moreData} className="load-more">
                    {!loadingProyectos ?(
                        loadingProyectos !== 0 ? "Obtener mas Proyectos" : "no hay mas Proyectos"
                    ) : (
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                    )}
                </Button>
                </BasicLayout>
    )
}

function formatModal(proyecto){
    const proyectosTemp = [];
    proyecto.forEach(proyectos =>{
        proyectosTemp.push({
            _id: proyectos.Proyectos._id,
        userId: proyectos.usuariorelacionid,
        titulo: proyectos.Proyectos.titulo,
        empresa: proyectos.Proyectos.empresa,
        descripcion:  proyectos.Proyectos.descripcion,
        fecha: proyectos.Proyectos.fecha
        })
    })
    console.log(proyectosTemp)
    return proyectosTemp
}