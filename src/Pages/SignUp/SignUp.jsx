import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile updated');
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Sign up successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/')
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
    };


    return (
        <>
            <Helmet>
                <title>Bistro Boss | sign up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo url</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="photo url" className="input input-bordered" />
                                {errors.photoURL && <span className='text-red-600'>photoURL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} placeholder="name" name='name' className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} type="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-600'>password is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>password  must be 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-600'>password is less then 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-600'>password is must have one upper case and lower case one number </span>}

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="card-body"><small>New here? <Link className='text-blue-700' to='/login'>Already an Account</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;