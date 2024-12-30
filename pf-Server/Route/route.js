const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMidlleWare = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleWare')
// register

router.post('/register',userController.register)

// login

router.post('/login',userController.login)

// add-project
router.post('/add-project',jwtMidlleWare,multerConfig.single('projectImage'),projectController.addProjects)



// getHomeProjects
router.get('/home-project',projectController.getHomeProjects)

// getallProject
router.get('/all-project',jwtMidlleWare,projectController.getAllProjects)

// getHomeProjects
router.get('/user-project',jwtMidlleWare,projectController.getUserProjects)


// updateProject

router.put('/projects/:pid/update',jwtMidlleWare,multerConfig.single('projectImage'),projectController.editProjects)

// deleteProject

router.delete('/projects/:pid/delete',jwtMidlleWare,projectController.deleteProject)




module.exports=router