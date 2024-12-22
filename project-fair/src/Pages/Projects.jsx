import React from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'

function Projects() {
  return (
    <>
    <Header/>
    <div className="projects mt-5">
      <h1 className='text-center mb-5'>AllProjects</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex border w-50 rounded-mb-3">
          <input type="text" className='form-control' placeholder='search by technologies' />
          <i style={{marginLeft:'-50px'}} className='fa-solid fa-magnifying-glass fa-rotate-90'></i>
        </div>
      </div>
    </div>
      
      <Row className='container-fluid mt-5'>

        <Col sm={12} md={6} lg={4}>
         <ProjectCard/>
      
        </Col>
        <p className='text-danger fw-bolder ms-2'>Nothing to display </p>

      </Row>
    </>
  )
}

export default Projects
