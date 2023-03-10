import React, { useContext } from 'react'
import { Context } from './Context'

const Home = () => {
  const {email}=useContext(Context)
  return (
    <div style={{backgroundColor:"lightblue",height:"500px",paddingTop:"200px",marginTop:"20px"}}>
        
      
        <div> WELCOME </div>
           {email}
      
      </div>
  )
}

export default Home