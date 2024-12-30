import React, { useContext, useEffect, useState } from 'react';
import AddProject from './AddProject';
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI';
import { addProjectResponseContext, editProjectResponseContext } from '../contextAPI/ContextShares';
import EditProject from './EditProject';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProjects() {
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext);
        const{editProjectResponse,setEditProjecResponse}=useContext(editProjectResponseContext)
  
  const [allProjects, setAllProjects] = useState([]);

  const getAllUserProjects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await getUserProjectAPI(reqHeader);
        if (result.status === 200) {
          setAllProjects(result.data);
        } else {
          toast.warning(result.response?.data || "Failed to fetch projects.");
        }
      } catch (err) {
        toast.error("Error fetching projects.");
        console.log(err);
      }
    }
  };

  const handleDeleteProject = async (pid) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await deleteProjectAPI(pid, reqHeader);
        if (result.status === 200) {
          getAllUserProjects();
          toast.success("Project deleted successfully.");
        } else {
          toast.warning(result.response?.data || "Failed to delete project.");
        }
      } catch (err) {
        toast.error("Error deleting project.");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllUserProjects();
  }, [addProjectResponse,editProjectResponse]);

  return (
    <>
      <div className="card shadow mt-5">
        <div className="container-fluid p-3">
          <h1 className="fw-bolder text-dark">My Projects</h1>
        </div>
        <div className="ms-auto">
          <AddProject />
        </div>
        {allProjects?.length > 0 ? allProjects.map(project => (
          <div className="mt-4 border p-3 container-fluid" key={project._id}>
            <h2 className="text-danger fw-bolder">{project?.title}</h2>
            <div className="d-flex justify-content-end align-items-center">
              <EditProject project={project} />
              <a className="me-3 btn text-dark" href={project?.github}>
                <i className="fa-brands fa-github"></i>
              </a>
              <button onClick={() => handleDeleteProject(project?._id)} className="btn text-dark">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        )) : null}
      </div>
      <ToastContainer 
  position="top-center" 
  autoClose={5000} 

/>
    </>
  );
}

export default MyProjects;
