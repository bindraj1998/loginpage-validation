import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HttpsIcon from '@mui/icons-material/Https'
import { Context } from './Context'


const Login = () => {
  const navigate=useNavigate()
   const {emailstore}=useContext(Context)
    const [login,setlogin]=useState({})
    const handleadd=(e)=>{
        let {name,value}=e.target
        setlogin({...login,[name]:value})
    }
    const handlesubmit=async(e)=>{
        e.preventDefault()

        var {email,password}=login
        if(!email || !password){
            alert("fill the field")
            return
        }
         emailstore(email)
            console.log("email",email)
          
       const  res=await fetch("/login",{
       
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({email,password})
       })
        const data=await res.json() 
        console.log(data)

    if(data.message=="Email or password incorrect" || data.message=="internal server error" || data.message=="password or email not matched try another email"){
        alert(`${data.message}`)
        setlogin({})
       
    }

    else{
        alert("login successful")
        setlogin({})
        navigate("/home")
    }
        

    }
  return (
    <div style={{width:"30%",margin:"auto",marginTop:"50px"}}><div ><p style={{backgroundColor:"#1976d2",width:"30px",borderRadius:"50%",margin:"auto",color:"white"}}><HttpsIcon/></p><p style={{marginTop:"0px"}}>Sign In</p></div>

      <form method='POST' onSubmit={handlesubmit}>

        <input style={{width:"98%",height:"40px",marginTop:"20px"}} type="email" value={login.email==undefined? "":login.email} name="email" placeholder='email*' onChange={handleadd}/>
       <br></br>
       <input style={{width:"98%",height:"40px",marginTop:"20px"}} type="password"value={login.password==undefined? "":login.password} name="password" placeholder='password*' onChange={handleadd}/>
       <br></br>
        
         <button style={{width:"100%",height:"30px",marginTop:"30px",backgroundColor:"#1976d2",color:"white"}} type="submit">SIGN IN</button>
        </form>
        <div style={{justifyContent:"end",display:"flex",marginTop:"20px",fontSize:"15px"}}>
        <Link  to="/">Don't  have account ?  Sign Up</Link>
        </div>
    </div>
  )
}

export default Login