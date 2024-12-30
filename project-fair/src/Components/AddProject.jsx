import React, { useContext, useState, useEffect } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contextAPI/ContextShares';
import Swal from 'sweetalert2';

function AddProject() {
    const [show, setShow] = useState(false);
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext);

    const [projectData, setProjectData] = useState({
        title: "", languages: "", overview: "", github: "", website: "", projectImage: ""
    });

    const [preview, setPreview] = useState("");
    const [fileStatus, setFileStatus] = useState(false);

    const handleClose = () => {
        setShow(false);
        setProjectData({ title: "", languages: "", overview: "", github: "", website: "", projectImage: "" });
        setPreview("");
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        if (projectData.projectImage && (projectData.projectImage.type === 'image/png' || projectData.projectImage.type === 'image/jpg' || projectData.projectImage.type === 'image/jpeg')) {
            setPreview(URL.createObjectURL(projectData.projectImage));
            setFileStatus(false);
        } else {
            setFileStatus(true);
            setProjectData({ ...projectData, projectImage: "" });
        }
    }, [projectData.projectImage]);

    const handleAddProject = async () => {
        const { title, languages, overview, github, website, projectImage } = projectData;
        if (!title || !languages || !overview || !github || !website || !projectImage) {
            toast.info("Please fill missing fields");
        } else {
            const reqBody = new FormData();
            reqBody.append("title", title);
            reqBody.append("languages", languages);
            reqBody.append("overview", overview);
            reqBody.append("github", github);
            reqBody.append("website", website);
            reqBody.append("projectImage", projectImage);

            const token = sessionStorage.getItem("token");

            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                };

                try {
                    const result = await addProjectAPI(reqBody, reqHeader);
                    if (result.status === 200) {
                        
                        Swal.fire({
                            title: 'Success!',
                            text: 'Project added successfully',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                       
                        handleClose();
                        setAddProjectResponse(result.data);
                        

                    } else {
                        toast.warning(result.response.data);
                    }
                } catch (err) {
                    toast.error("An error occurred while adding the project");
                }
            }
        }
    };

    return (
        <>
            <Button variant="dark" onClick={handleShow} className='me-2 rounded'>
                Add Project
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            <label>
                                <input type='file' style={{ display: 'none' }} onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} />
                                <img height={'350px'} width={'100%'} src={preview || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPkm3Hhfm2fa7zZFgK0HQrD8yvwSBmnm_Gw&s"} alt="" />
                            </label>
                            {fileStatus && <div className="mb-3 text-danger">
                                Please upload following formats only (png/jpg/jpeg)
                            </div>}
                        </div>
                        <div className="col-6">
                            <Form>
                                <div className="mb-2"> 
                                    <FloatingLabel controlId="floatingtitle" label="Project Title">
                                        <Form.Control type="text" placeholder="Enter your Project Title" onChange={e => setProjectData({ ...projectData, title: e.target.value })} />
                                    </FloatingLabel>
                                </div>
                                <div className="mb-2"> 
                                    <FloatingLabel controlId="floatinglanguage" label="Languages Used">
                                        <Form.Control type="text" placeholder="Enter your Project Language" onChange={e => setProjectData({ ...projectData, languages: e.target.value })} />
                                    </FloatingLabel>
                                </div>
                                <div className="mb-2"> 
                                    <FloatingLabel controlId="floatingOverview" label="Project Overview">
                                        <Form.Control type="text" placeholder="Overview" onChange={e => setProjectData({ ...projectData, overview: e.target.value })} />
                                    </FloatingLabel>
                                </div>
                                <div className="mb-2"> 
                                    <FloatingLabel controlId="floatinggit" label="Github Link">
                                        <Form.Control type="text" placeholder="Github" onChange={e => setProjectData({ ...projectData, github: e.target.value })} />
                                    </FloatingLabel>
                                </div>
                                <div className="mb-2"> 
                                    <FloatingLabel controlId="floatingweb" label="Website Link">
                                        <Form.Control type="text" placeholder="Website link" onChange={e => setProjectData({ ...projectData, website: e.target.value })} />
                                    </FloatingLabel>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="dark" onClick={handleAddProject}>Upload</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-right" autoClose={5000} closeOnClick={true}/>
        </>
    );
}

export default AddProject;
