const mongoose = require('mongoose')

const connectionString =  process.env.connectionString

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas Connected Successfully to Pf-Server");
    
}).catch((err)=>{
    console.log("MongoDB connection failed",err);
    
})
