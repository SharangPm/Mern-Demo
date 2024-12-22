const jwt = require('jsonwebtoken')

const jwtMidlleWare = (req,res,next)=>{
    console.log("inside jwtMidlleWare function");
    try{
    
       const token = req.headers['authorization'].split(" ")[1]
       console.log(token);
       if(token){
        const jwtResponse = jwt.verify(token,process.env.jwt_secret)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next() 

        
       }else{
        res.status(401).json("please provide a token")
       }
       


    }catch(err){
      
        res.status(403).json("please login")
    }
    
}


module.exports=jwtMidlleWare