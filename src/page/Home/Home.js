import React from 'react'
import "./Home.scss";
import BasicLayout from "../../layout/BasicLayout";
import {Button} from "react-bootstrap"
import  innovator from "../../assets/png/innovator.png"
import  learning from "../../assets/png/learning.png"
import  Search from "../../assets/png/search.png"
import  Share from "../../assets/png/share.png"
import  Calavera from "../../assets/png/skull-1313600_1920.png"

export default function Home(props) {
    const {setRefreshCheckLogin} = props;
    return (

        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className="home">
        <div className="container">
		<div className="coverPage">
			<div className="space">
				<div className="stripe">
					<h2>VIRTUAL <br/>BRIEFCASE<br/></h2>
					<p>COMPARTE - APRENDE - INSPÍRATE</p>
				</div>
                <img className="coverPageImg" src={Calavera} alt="calavera"/>
				<div className="vbInf">
					<div className="text">
						Virtual Briefcase es un espacio para que tú <br/> puedas dar a conocer tus proyectos.
					</div>
					
				</div>
			</div>
		</div>
		<div className="cards">
			<div className="card">
				<img src={Share} alt="share"/>
				<span>COMPARTE</span>
				<p>¿Te gustaría dar a conocer al mundo todo tu potencial? ¡Compártelo!<br/><br/>
					Virtual Briefcase te ofrece el espacio para que muestres al mundo tus mejores proyectos. Escógelos ý súbelos a nuestra web.<br/><br/>¡El resto es magia!</p>
			</div>
			<div className="card">
				<img src={learning} alt="learning"/>
				<span>APRENDE</span>
				<p>¡Aprender es sinónimo de mejorar!<br/><br/>En Virtual Briefcase estarás tan rodeado de proyectos realizados por otros usuarios que sin darte cuenta estarás aprendiendo nuevas formas creativas y divertidas de dar solución a cualquier trabajo.</p>
			</div>
			<div className="card">
				<img src={innovator} alt="innovator"/>
				<span>INSPÍRATE</span>
				<p>¿Estás pasando por un bloqueo mental?<br/>¡No te preocupes!<br/>¿Porqué no mejor miras un par de proyectos de otros usuarios?<br/>A lo mejor encuentras algo interesante que te regrese la inspiración que necesitas, pero ¡OJO!<br/><br/>¡No se vale copiar! Jaja</p>
			</div>
		</div>
		<div className="cardExtra">
			<p>Pero hey! A lo mejor solo deseas entretenerte con algun proyecto loco y creativo! Así que puedes simplemente buscar en nuestra web cualquier proyecto que llame tu atención. Prueba la barra de búsqueda, a lo mejor encuentras algo muy interesante...!</p>
			<img src={Search} alt="search.png"/>
		</div>
	</div>
                </BasicLayout>
            
      
    )
}
