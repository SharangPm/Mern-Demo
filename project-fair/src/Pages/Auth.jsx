import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';



function Auth({ register }) {

    const isRegisterForm = register ? true : false
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: "", email: "", password: ""
    })

    const handleRegister = async (e) => {
        e.preventDefault()
        const { username, email, password } = userData

        if (!username || !email || !password) {
            toast.info("please fill missing fields")
        } else {

            // api call

            const result = await registerAPI(userData)
            console.log(result);
            if (result.status == 200) {
                toast.success(`${result.data.username} has successfully registered`)
                navigate('/login')
                setUserData({ username: "", email: "", password: "" })

            } else {
                toast.warning(result.response.data)
            }

        }
    }

   

    const handleLogin=async(e)=>{
        e.preventDefault()
        const{email,password}=userData
        if(!email || !password){
            toast.info("please fill missing fields")
        }else{
            try{
                // proceed to api call
                const result = await loginAPI({email,password})
                if(result.status==200){
                    sessionStorage.setItem("username",result.data.existingUser.username)
                    sessionStorage.setItem("token",result.data.token)
                    navigate('/')
                    setUserData({username:"",email:"",password:""})
                }else{
                    toast.warning(result.response.data)
                }

            }catch(err){
                
                console.log(err);
                
            }
        }

    }





    return (
        <>
            <div className="d-flex justify-content-center align-item-center">
                <div className="w-75 container">
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bolder' }}><i className='fa-solid fa-arrow-left me-2'></i>Back to Home</Link>
                    <div className="card shadow p-5 bg-primary">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <img src="https://static.vecteezy.com/system/resources/previews/003/049/675/non_2x/login-form-on-a-computer-for-sign-in-to-account-vector.jpg" alt="" width={'100%'} className='rounded-start' />
                            </div>
                            <div className="col-lg-6">
                                <div className="d-flex align-items-center flex-column">
                                    <h1 className='fw-bolder text-light mt-5'><i class="fa-solid fa-list-check me-2"></i> Project-Fair</h1>
                                    <h5 className='text-light fw-bolder text-center'>
                                        {
                                            isRegisterForm ? 'Sign-Up to your Account' : 'Sign-In to your Account'
                                        }
                                    </h5>

                                    <Form className='text-light w-100'>
                                        {
                                            isRegisterForm && <Form.Group className="mb-3" controlId="exampleForm.ControlInputName">
                                                <Form.Control type="text" placeholder="enter your name" onChange={e => setUserData({ ...userData, username: e.target.value })} />
                                            </Form.Group>
                                        }
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputemail">
                                            <Form.Control type="email" placeholder="enter your email" onChange={e => setUserData({ ...userData, email: e.target.value })} value={userData.email} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputpswd">
                                            <Form.Control type="password" placeholder="enter your passwrd" onChange={e => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
                                        </Form.Group>
                                        {
                                            isRegisterForm ?
                                                <div className="mt-3">
                                                    <button className='btn btn-warning' onClick={handleRegister}>Register</button>
                                                    <p>Already Have An Account? Click Here to <Link to={'/login'} style={{ textDecoration: 'none', color: 'green' }}> Login</Link></p>

                                                </div> :
                                                <div className="mt-3">
                                                    <button className='btn btn-success' onClick={handleLogin}>Login</button>
                                                    <p className='mt-2 fw-bolder'>New User?Click here to <Link to={'/register'} style={{ textDecoration: 'none', color: 'red' }}>Register</Link></p>
                                                </div>

                                        }
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' />

        </>
    )
}

export default Auth

