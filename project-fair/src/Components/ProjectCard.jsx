import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import prjctCard from '../assets/images/project-image.jpg'

function ProjectCard() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
       <Card style={{ width: '18rem' }} className='shadow rounded mt-5'>
      <Card.Img variant="top" src={prjctCard} width={'100%'} onClick={handleShow}/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
      </Card.Body>
    </Card>


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
  <Col>
    <img src={prjctCard} width={"100%"} alt="" />
  </Col>
  <Col>
    <h2 className="fw-bolder text-dark">Project Title</h2>
    <h5 className="fw-bolder">
      <span className="text-warning">Languages Used</span>: React
    </h5>
    <p className="fw-bolder">
      <span className="text-success">Overview</span>: Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, adipisci alias eveniet ex quam assumenda quisquam libero eius officia obcaecati maiores repudiandae unde itaque vero quas atque? Dicta, magnam at.
    </p>
  </Col>
</Row>

<div className="mt-2">
  <a href="#" target="_blank" className="me-3 btn text-dark">
    <i className="fa-brands fa-github fa-2x"></i>
  </a>
  <a href="#" target="_blank" className="me-3 btn text-dark">
    <i className="fa-solid fa-link fa-2x"></i>
  </a>
</div>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard
