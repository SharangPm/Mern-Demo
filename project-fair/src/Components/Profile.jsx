import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <div className="card shadow mt-5 p-5 me-2">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Profile</h1>
            <button
              onClick={() => setOpen(!open)}
              aria-controls="collapse-profile"
              aria-expanded={open}
              className="btn btn-outline-info"
            >
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </div>
          <Collapse in={open}>
            <div id="collapse-profile">
              <div className="row justify-content-center p-5">
                <label>
                  <input type="file" style={{ display: 'none' }} />
                  <img
                    width={'70%'}
                    height={'200px'}
                    src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
                    alt="profile"
                    style={{ cursor: 'pointer', objectFit: 'cover' }}
                  />
                </label>
              </div>
              <div className="mt-5">
                <input type="text" placeholder="GitHub Link" className="form-control" />
                <br />
                <input type="text" placeholder="LinkedIn Link" className="form-control" />
                <div className="d-grid mt-5">
                  <button className="btn btn-warning">Update</button>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default Profile;
