import React from 'react';
import AddProject from './AddProject';

function MyProjects() {
  return (
    <div className="card shadow mt-5">
      <div className="container-fluid p-3">
        <h1 className="fw-bolder text-dark">My-Projects</h1>
      </div>
      <div className="ms-auto">
        <AddProject />
      </div>
      <div className="mt-4 border p-3 container-fluid">
        <h2 className="text-danger fw-bolder">Project Title</h2>
        <div className="d-flex justify-content-end align-items-center">
          <a className="me-3 btn text-dark">
            <i className="fa-regular fa-pen-to-square"></i>
          </a>
          <a className="me-3 btn text-dark">
            <i className="fa-brands fa-github"></i>
          </a>
          <button className="btn text-dark">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
