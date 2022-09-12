import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/signUpSchema";
import "./register.css";

const initialValues = {
  name:'',
  email:'',
  password:'',
  rePassword:''
}
const Register = () => {
  const navigate = useNavigate()

  

  const register = (value) => {
    const { name, email, password, rePassword } = value

    if (name && email && password && password == rePassword) {
      axios.post("http://localhost:8000/register", value);
    } else {
      alert("Invalid Entries");
    }
    navigate("/login");

      }
      const { values, errors, handleChange, touched ,handleBlur,handleSubmit } = useFormik({
        initialValues,
        validationSchema:signUpSchema,
        
        onSubmit:(value,action)=>{
            console.log(JSON.stringify(value))
            register(value)
            localStorage.setItem("Details",JSON.stringify(value))
            action.resetForm()
        }
    })

    const route = () => {
      navigate("/login");
    }
    return (
      <>
      
        
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                  <div className="card-img-left d-none d-md-flex">
                    
                    <div className="registration-form">
                    <div className="card-body p-4 p-sm-5">
                      <h2 className="card-title text-center mb-5 fw-light fs-5">
                        Register
                      </h2>
                      <form>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputUsername"
                            placeholder="myusername"
                            autoComplete='off' onBlur={handleBlur}
                            required
                            autofocus
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                          />
                          {errors.name && touched.name? <p style={{color:'red'}} className='form-error'>{errors.name}</p>:null}
                          
                          <label for="floatingInputUsername">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="floatingInputEmail"
                            placeholder="name@example.com"
                            name="email"
                            autoComplete='off' onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email ? <p style={{color:'red'}} className='form-error'>{errors.email}</p>:null}

                         

                          <label for="floatingInputEmail">Email address</label>
                        </div>

                        {/* <br /> */}

                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            autoComplete='off' onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                          />
                          {errors.password && touched.password ? <p style={{color:'red'}} className='form-error'>{errors.password}</p>:null}

                         
                          <label for="floatingPassword">Password</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPasswordConfirm"
                            placeholder="confirm password"
                            name="rePassword"
                            autoComplete='off' onBlur={handleBlur}
                            value={values.rePassword}
                            onChange={handleChange}
                          />
                          {errors.rePassword && touched.rePassword ? <p style={{color:'red'}} className='form-error'>{errors.rePassword}</p>:null}
                         

                          <label for="floatingPasswordConfirm">
                            Confirm Password
                          </label>
                        </div>

                        <div className="d-grid mb-2">
                          <button
                            className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                            type="submit"
                            onClick={handleSubmit}
                          >
                            Register
                          </button>
                        </div>

                        <a
                          className="d-block text-center mt-2 small"
                          href="#"
                          onClick={route}
                        >
                          Have an account? Log In
                        </a>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            className="img-fluid"
                            alt="Sample image"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </>
    );
  };

export default Register;



