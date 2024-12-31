import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { TokenAuthContext } from '../contextAPI/TokenAuth'

function Header({insideDashboard}) {
   const Navigate = useNavigate()
   
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
   
  const handleLogOut = ()=>{
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    Navigate('/')
  }
  return (
    <>
          <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand>
          <Link to={'/'}  style={{textDecoration:'none'}} className='fw-bolder text-light mt-5'><i class="fa-solid fa-list-check me-2"></i> Project-Fair</Link>

          </Navbar.Brand>
          {insideDashboard && <button onClick={handleLogOut} className='btn btn-warning rounded'>Logout</button>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header
