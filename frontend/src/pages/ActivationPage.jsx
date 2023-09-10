import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {server} from '../server'

const ActivationPage = () => {
    const {activation_token} = useParams();
    const [error, setError] = useState(false);

    useEffect(()=>{
        const activationEmail = async() => {
            try{
                const res = await axios.post(`${server}/user/activation`,{
                    activation_token
                });
                console.log(res);
            }catch(error){
                setError(true);
            }
        }
        activationEmail();
    },[activation_token])
  return (
    <div className="" style={{
        width:"100vw",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"sans-serif",
        fontWeight:"500",
        fontSize:"2rem"
    }}>
        {error?(<p>Your Token is expired</p>):(
            <p>Your Account has been created successfully</p>
        )}
    </div>
  )
}

export default ActivationPage
