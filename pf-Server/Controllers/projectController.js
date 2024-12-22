const projects = require("../Model/projectSchema")

// addProject

exports.addProjects=async(req,res)=>{

    console.log("inside add project");
    const{title,languages,overview,github,website}=req.body
    const projectImage = req.file.filename
    const userId = req.payload

    // console.log(title,languages,overview,github,website,projectImage,userId);
    
    try{

        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already exist")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){

        res.status(401).json(err)

    }



   
    

}


// getHomeProjects

exports.getHomeProjects=async(req,res)=>{
    console.log("inside home projects function");
    try{

        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){

      res.status(401).json(err)

    }
}

// getAllProjects

exports.getAllProjects=async(req,res)=>{

    console.log("inside all projects function");

    try{

        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    }catch(err){

      res.status(401).json(err)

    }
    
}

// getUserProjects
exports.getUserProjects=async(req,res)=>{

    console.log("inside user project function");
    const userId = req.payload

    try{

        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    }catch(err){

      res.status(401).json(err)

    }
    
}


