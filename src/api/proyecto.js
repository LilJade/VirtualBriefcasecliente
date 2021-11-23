import {API_HOST} from "../utils/constant";
import {getTokenApi} from "./auth"

export function addProyectoApi(data){
    const url = `${API_HOST}/createProject`
    const params = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
    .then(response => {
        if(response.status >=200 && response.status <300){
            return {code: response.status, message:"Proyecto enviado"}
        }
        return {code:500, message:"Error del servidor"}
    }).catch((err) => {
        return err;
    })
}

export function getUserProyectoApi(idUser, page){
    const url = `${API_HOST}/seeProject?id=${idUser}&pagina=${page}`;

    const params ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .catch((err)=>{
        return err;
    });
}

export function getProyectoApi(id){
    const url = `${API_HOST}/proyecto?id=${id}`;

    const params = {
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url, params)
    .then(response =>{
        // eslint-disable-next-line no-throw-literal
        if(response.status >= 400) throw null
        return response.json()
    })
    .then(result => {
        return result;
    }).catch(err =>{
        return err;
    })
}

export function uploadPortadaApi(file, ids){
    const url = `${API_HOST}/updatePortada`;
    const formData = new FormData();
    formData.append("portada", file);
    formData.append("id", ids);
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: formData
    }
    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result
    })
    .catch(err =>{
        return err;
    })
}

export function updateInfoProyectoApi(data){
    const url = `${API_HOST}/updateProject`;
    const params = {
        method: "PUT",
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
    .then(response => {
        return response;
    })
    .catch(err => {
        return err;
    })
}

export function getProyectosSeguidores(page){
    const url = `${API_HOST}/seeFProjects?pagina=${page}`;
    const params ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params)
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        return err;
    })
}

export function DeleteProyecto(id){
    const url = `${API_HOST}/delProject?id=${id}`;

    const params = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url,params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result;
    })
    .catch(err =>{
        return err
    });

}