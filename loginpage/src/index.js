
const path=require("path")
const express=require("express")
const mongoose=require("mongoose")
const { body, validationResult } = require('express-validator');


const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const User=require("./model/user.modle")
 const static=path.join(__dirname,"../public")

 app.use(express.static(static))
//  const static= path.join(__dirname,"../public")
//  app.use(express.static(static))
const conection=()=>{
    return mongoose.connect("mongodb://localhost:27017/fullstack")
}



   app.get("/",(req,res)=>{

       res.sendFile(path.join(__dirname,"../public/index.html"))

   })


  app.post("/signup",body("email").custom((value=>{
          let check= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
          if(check.test(value)){
               return true
          }
          throw new Error ("email is not valid")



  })),body("password").isLength({min:5,max:16}).withMessage("password must be 5-16 characters"),async(req,res)=>{
       try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newerror=errors.array().map((el)=>{return {message:el.msg}})
      return res.status(400).json(newerror[0]);
    }


     const user=await User.findOne({email:req.body.email}).lean().exec()
    
      if(user){
        return res.send({message:"user already exist try another email"})
      }
      

     
         let data= await User.create(req.body)
           
           return res.status(201).send({message:"user registered successfully"})
     
       
         } 
       
       
       catch (error) {
       return  res.status(500).send({message:"iternal server error"})
        
       }
  })
 

  app.post("/login",async(req,res)=>{
    try {
        const email=await User.findOne({email:req.body.email})
       
        if(!email){
          return res.send({message:"Email or password incorrect"})
         }

        let match=email.checkpassword(req.body.password)

         if(!match)return res.status(400).send({message:"password or email not matched try another email"})


     
     if(email && match){
       return  res.send({message:"login successful"})
    }

     
    } catch (error) {
    return  res.send(error)
     
    }
})
const port=process.env.port||8080

app.listen(port, async function(){
    try {
           await conection()
           console.log(`lisning on ${port}`)
    } catch (error) {
        console.log({error:"internal Server Error"})
    }
})



