const express = require("express")
const { UserModel } = require("../modules/user.module")
const jwt = require("jsonwebtoken")
const bcript = require("bcrypt")
const userRoutes = express.Router()

userRoutes.get("/",async(req,res)=>{
    let users = await UserModel.find()
    res.send(users)
})

userRoutes.post("/register",async(req,res)=>{
    let {name,email,pass,age} = req.body
    try {
        let olduser = await UserModel.findOne({email})
        if(olduser){
            res.send({"msg":"This email is already registered"})
        }else{
            bcript.hash(pass,5,async(err,hash)=>{
                if(err){
                    res.send({msg:"something wrong with hashing"})
                }else{
                    let user = new UserModel({name,email,pass:hash,age})
                    await user.save()
                    res.send({mag:"User registered"})  

                }
            })
        }
    } catch (err) {
        console.log(err)
        res.send({"msg":"user Not registered",error:err})
    }
})

userRoutes.post("/login",async(req,res)=>{
    let {email,pass} = req.body
    
    try {
        let user = await UserModel.find({email})
        let token = jwt.sign({userID:user[0]._id},"shhhh")
        if(user.length>0){
            let decriptPass = await bcript.compare(pass,user[0].pass)  // result true
            if(decriptPass){
    
                res.send({msg:"login successfully",token:token})
            }else{
                res.send({msg:"wrong password"})
            }
        }else{
            res.send({"mag":"wrong credentials"})
        }
    } catch (err) {
        res.send({"mag":"login failed"})
    }

})


module.exports = {userRoutes}