import React, {useState, useEffect} from 'react'
import {Button} from "react-bootstrap";
import { API_HOST } from '../../../utils/constant';
import "./Avatar.scss";
import Avatarno from "../../../assets/png/Perfil.png";
import ConfigModal from "../../../components/Modal/ConfigModal"
import EditUserForm from "../../User/EditUserForm"
import {checkFollowApi, followUserApi, unfollowUserApi} from "../../../api/follow";

export default function Avatar(props) {
    const{user, loggedUsers} = props;
    const [showModal, setShowModal] = useState(false)
    const [following, setFollowing] = useState(null)
    const [reloadFollow, setReloadFollow] = useState(false)

    const avararUrl = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : Avatarno;
   

    useEffect(() => {
        if(user){
       checkFollowApi(user?.id).then(response =>{
          if(response?.status){
              setFollowing(true);
          }
          else{
            setFollowing(false);
          }
       });
       setReloadFollow(false)
    }
    }, [user, reloadFollow])

    const onFollow = () =>{
        followUserApi(user.id).then(() =>{
            setReloadFollow(true)
        });
    }

        const onUnfollow = () =>{
            unfollowUserApi(user.id).then(() => {
                setReloadFollow(true)
            })
        }

    return (
        <div className = "avatar" style={{backgroundImage: `url('${avararUrl}')`}}>
        
        {user && (
          <div className="options">  
                 {loggedUsers._id === user.id && <Button onClick={() => setShowModal(true)}>Editar perfil</Button>}
                
                {loggedUsers._id !== user.id && (
                    following !== null &&(
                    (following ? <Button onClick={onUnfollow} className="unfollow">
                        <span>Siguiendo</span></Button>:<Button onClick={onFollow}>Seguir</Button>)
                        
                    )
                   
        )}
        <ConfigModal show={showModal} setShow={setShowModal} title="Editar perfil">
            <EditUserForm user={user} setShowModal={setShowModal}/>
        </ConfigModal>
    </div>
        )}
    
    </div>
    );
}
