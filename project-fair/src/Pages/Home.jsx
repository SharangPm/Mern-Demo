import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import titleimage from '../assets/images/typing.gif'
import ProjectCard from '../Components/ProjectCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../services/allAPI'

function Home() {

  const[isLoggedIn,setIsLoggedIn]=useState(false)
  const[allProjects,setAllProjects]=useState([])
  const navigate = useNavigate()

   useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
   },[])


   const handleProjectsPage=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')

    }else{
      toast.warning("please login to explore more projects...")
    }

   }



   const getHomeProjects=async()=>{
    // api call
    const result = await getHomeProjectAPI()
    console.log(result);

    if(result.status==200){
      setAllProjects(result.data)
      
    }else{
      console.log(result);
      
      
    }
    
    
    
    
   }


   console.log(allProjects);
   
  return (
    <>
        <div style={{height:"90vh",width:"100%"}} className="container-fluid rounde bg-primary pt-5">
        <Row className='align-items-center p-4'>
            <Col sm={12} md={6} >
            <h1 style={{fontSize:'80px'}} className='fw-bolder text-light mt-5'><i class="fa-solid fa-list-check me-2"></i> Project-Fair</h1>
            <p className='text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia accusamus sapiente facere reiciendis quaerat iure fuga at accusantium porro incidunt amet quam vitae nam, neque non a distinctio fugit laudantium?
            Iure expedita fugit corporis aperiam sint explicabo illo aliquam impedit assumenda, voluptatibus ut delectus sed id. Ex, eum aut nostrum natus explicabo, dolorum deserunt earum eius asperiores voluptatem error vitae?</p>
           { isLoggedIn ? 
           <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects</Link>:
           <Link to={'/login'} className='btn btn-warning'>Start to Explore</Link>}
            </Col>
            <Col sm={12} md={6}>
            <img src={titleimage} alt="" width={'500px'} />
            </Col>
            
        </Row>
        
    </div>

    {/* All Projects */}

    <div className="allProject mt-5">
      <h1 className='text-center text-primary fw-bolder'>Explore Your Projects</h1>
     <marquee scrollAmount={25}>
     <Row>
     {allProjects.length>0?allProjects.map(project=>(
     <Col sm={12} md={6} lg={4}>
     <ProjectCard project={project}/>
   </Col>
     )):null
     }
        
      </Row>

     </marquee>
    </div>
      
     <div className="text-center">
      <p className='btn' onClick={handleProjectsPage}>View More Projects</p>
     </div>
    <ToastContainer position='top-center' />

    </>
  )
}

export default Home
