import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import HttpsIcon from '@mui/icons-material/Https'

const Signup = () => {
    const navigate=useNavigate()

    const [data,setdata]=useState({})
    const [emailerror,setemailerror]=useState("")
    const [passworderror,setpassworderror]=useState("")
    // console.log(emailerror)

    const handleadd=(e)=>{
        let {name,value}=e.target
        setdata({...data,[name]:value})
    }

   
  

   
    const handlesubmit=async (e)=>{
        e.preventDefault()
        let {email,password}=data
        if(!email || !password){
            alert("please fill the field properly")
            return 
        }

       const res= await fetch("/signup",{
           method:"POST" ,
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({email,password})
        }
        )
    const re=await res.json()
      console.log(re)

        
       if(re.message=="email is not valid"){
           setemailerror(`${re.message}`)
          //  setdata({})
       }
       if(re.message=="password must be 5-16 characters"){
        setpassworderror(`${re.message}`)
       }
   
       if(re.message=="please fill the field properly" || re.message=="user already exist try another email" ){

           
            setdata({})
            setemailerror("")
            setpassworderror("")
            alert(`${re.message}`)
            return 
       }
       if( re.message=="user registered successfully") {
              alert(`${re.message}`)
                navigate("/login")
       }

    }

  return (
    <div style={{width:"30%",margin:"auto",marginTop:"50px"}}><div ><p style={{backgroundColor:"#1976d2",width:"30px",borderRadius:"50%",margin:"auto",color:"white"}}><HttpsIcon/></p><p style={{marginTop:"0px"}}>Sign up</p></div>

      <form method='POST' onSubmit={handlesubmit}>
          <div  style={{height:"50px"}}>
        <input style={{width:"98%",height:"40px",marginTop:"20px"}} type="email" value={data.email==undefined? "":data.email} name="email" placeholder='email*' onChange={handleadd}/>
          {emailerror==""?"":<p style={{height:"15px",marginTop:"-6px",color:"red",textAlign:"start",fontStyle:"italic",fontSize:'10px'}}>{emailerror}</p>}
          </div>
       <br></br>
       <div  style={{height:"50px"}}>
       <input style={{width:"98%",height:"40px",marginTop:"20px"}} type="password"value={data.password==undefined? "":data.password} name="password" placeholder='password*' onChange={handleadd}/>
       {passworderror==""?"":<p style={{height:"18px",marginTop:"-6px",color:"red",textAlign:"start",fontStyle:"oblique"}}>{passworderror}</p>}
          </div>
       <br></br>
        
         <button style={{width:"100%",height:"30px",marginTop:"30px",backgroundColor:"#1976d2",color:"white"}} type="submit">SIGN UP</button>
        </form>
        <div style={{justifyContent:"end",display:"flex",marginTop:"20px",fontSize:"15px"}}>
        <Link  to="/login">Already have account ?  Sign In</Link>
        </div>
    </div>
  )
}

export default Signup