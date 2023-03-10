import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display:'flex',width:"30%",justifyContent:'space-around',marginLeft:'70%'}}>
   
   {/* <Link to="/">Home</Link> */}
   <Link to="/login">Login</Link>
  
   <Link to="/">signup</Link>

    </div>
  )
}

export default Navbar