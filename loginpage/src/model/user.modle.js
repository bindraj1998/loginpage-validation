const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const userSchema=new mongoose.Schema({

  email:{type:String,required:true},
  password:{type:String,required:true}

},{versionKey:false,timestamps:true})

userSchema.pre("save",function(next){
  //save karne se pahale password ko hash kar te hai

  if(!this.isModified("password"))return next()
   var hash=bcrypt.hashSync(this.password,9)
  //  8=number of hashing
  this.password=hash
  return next()
})

userSchema.methods.checkpassword=function(password){

  return bcrypt.compareSync(password,this.password);
}


const user=mongoose.model("user",userSchema)

module.exports=user


