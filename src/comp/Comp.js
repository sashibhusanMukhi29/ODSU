import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Comp = () => {
    const[user,setUser]=useState([])
    useEffect(()=>{
        getData();
    },[])
    const getData=async()=>{
       const result = await axios.get("http://localhost:3002/rrfData")
       setUser(result.data)
    }
  return (
    <div>
        <table>
           <tbody>
            {
                user.map((e)=>{
                    return(<tr>
                        <td>{e.id}</td>
                        <td>{e.RRF_ID}</td>
                        <td>{e.Job_Title}</td>
                        <td>{e.location}</td>
                        <td>{e.Publish_on}</td>
                        <td>{e.Action}</td>
                        </tr>)
                    
                })
            }
           </tbody>
        </table>
      
    </div>
  )
}

export default Comp
