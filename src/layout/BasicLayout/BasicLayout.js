import React from 'react'
import "./BasicLayout.scss";
import Menu from"../../components/Menu";
import {Container} from "react-bootstrap"
export default function BasicLayout(props) {
    const {children, className, setRefreshCheckLogin} = props;
    return (
        <>
                <div className ="basic-layout__menu">
                <Menu setRefreshCheckLogin={setRefreshCheckLogin}/>  
                 </div>
            <Container className ={`basic-layout ${className}`}>
                    <div className ="basic-layout__content">
                    {children}
                    </div>

            </Container>
            </>
        
    )
}
