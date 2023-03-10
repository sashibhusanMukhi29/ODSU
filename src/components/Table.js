import axios from 'axios'
import React, { useState } from 'react'
import { useEffect,useRef } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

function Table() {
    const[info,setinfo]=useState([])
    const tableRef = useRef(null);

    useEffect(()=>{
      axios.get("https://jsonplaceholder.typicode.com/posts").then(resp=>setinfo(resp.data))
    },[])
  return (
    <div>
        <CopyToClipboard
         text={info}
        >
 
       <button>CopyToClipboard</button>
    </CopyToClipboard>
            
      <table ref={tableRef}>
        <thead>
            <th>userId</th>
            <th>id</th>
            <th>title</th>
            <th>body</th>
        </thead>
        <tbody>
           {info.map((e)=>(
           <tr>
           <td>{e.userId}</td>
            <td>{e.id}</td>
            <td>{e.title}</td>
            <td>{e.body}</td>
           </tr>
            
            
           ))}
        </tbody>
      </table>
 
    </div>
  )
}

export default Table
