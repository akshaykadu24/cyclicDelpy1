const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    let token = req.headers.authorization
    if(token){                                       // checking login token from headers
         jwt.verify(token,"shhhh",(err,decoded)=>{     //getting userID or {foo:bar} object when creation jwt on logging 
            if(err){
                res.send({msg:"invalid token"})
            }else{
                console.log(decoded)
                req.body.user = decoded.userID         //set userid in req.body  
                next()
            }
        })   
    }else{
        res.send({msg:"token is missing"})
    }
    
}

module.exports = {auth}