import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import { object, string } from 'yup';
import { addRegistration, loginUser, updatePassword, updateStatus } from '../../Redux/Slice/Auth.slice';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Login(props) {
    const [type, setType] = useState('login')
    const form = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sendOTP, setSendOTP] = useState('')
    const [userOTP, setUserOTP] = useState('')
    const [forgotEmail, setforgotEmail] = useState('')
    const isActive = false


    const sendEmail = (values) => {
        const generatedOTP = Math.floor(Math.random() * 1000000)
        setSendOTP(generatedOTP)
        setforgotEmail(values.email)
        setType('otp')

        emailjs
            .send('service_zppnhcs', 'template_12aebtt', {
                email: values.email,
                otp_code: generatedOTP,
                name: "Vaibhav Gohil"
            }, {
                publicKey: 'vq0PugDSMVxTMBX8R',
            })
            .then(
                () => {
                    console.log('OTP SENt SUCCESSFULLY!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    const handleActiveEmail = (values) => {

        const generatedOTP = Math.floor(Math.random() * 1000000)
        setSendOTP(generatedOTP)
        setforgotEmail(values.email)
        setType('activeOTP')
        console.log({
            email: values.email,
            otp_code: generatedOTP,
            name: "Vaibhav Gohil"
        });


        emailjs
            .send('service_zppnhcs', 'template_12aebtt', {
                email: values.email,
                otp_code: generatedOTP,
                name: "Vaibhav Gohil"

            }, {
                publicKey: 'vq0PugDSMVxTMBX8R',
            })
            .then(
                () => {
                    console.log('OTP SENt SUCCESSFULLY!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };



    const handleOTP = () => {


        if (type === 'activeOTP') {
            if (userOTP === sendOTP.toString()) {

                handleActiveOtp()
            } else {
                alert("Incorrect OTP. Please try again.")
            }

        } else if (type === 'otp') {
            if (userOTP === sendOTP.toString()) {
                // alert("OTP match")
                setType("verified")
            } else {
                alert("Incorrect OTP. Please try again.")
            }
        }


    }

    const handleActiveOtp = () => {

        dispatch(updateStatus({ forgotEmail, isActive: true }))

        setType('login')
    }


    let loginSchema = {}, initialValues = {};

    if (type === 'login') {
        initialValues = {
            email: '',
            password: ''
        }
        loginSchema = object({
            email: string().email().required("Please enter email"),
            password: string()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum 8 latters - alphabet(upar and Lower Case), number and special Symbol.")
                .required("Please enter password")
        })
    } else if (type === 'signup') {
        initialValues = {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
        loginSchema = object({
            name: string().required("Please enter name"),
            email: string().email().required("Please enter email"),
            password: string()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum 8 latters - alphabet(upar and Lower Case), number and special Symbol.")
                .required("Please enter password"),
            confirm_password: string()
                .test("confirm_password", "Confirm Password not match", function (value) {
                    if (value === this.parent.password) {
                        return true;
                    } else {
                        return false
                    }
                })
        })
    } else if (type === 'forgot_password') {
        initialValues = {
            email: '',

        }
        loginSchema = object({
            email: string().email().required("Please enter email"),

        })
    } else if (type === 'verified') {
        initialValues = {
            password: '',
            confirm_password: ''
        }
        loginSchema = object({
            password: string()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum 8 latters - alphabet(upar and Lower Case), number and special Symbol.")
                .required("Please enter password"),
            confirm_password: string()
                .test("confirm_password", "Confirm Password not match", function (value) {
                    if (value === this.parent.password) {
                        return true;
                    } else {
                        return false
                    }
                })
        })
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        enableReinitialize: true,
        onSubmit: (values, { }) => {

            if (type === 'signup') {

                handleActiveEmail(values)
                dispatch(addRegistration({ ...values, isActive: isActive }))


            } else if (type === 'login') {
                dispatch(loginUser({ values, navigate }))
            } else if (type === "forgot_password") {
                sendEmail(values)
            } else if (type === 'otp') {
                handleOTP()
            } else if (type === 'verified') {
                dispatch(updatePassword({ ...values, forgotEmail }))
                setType('login')
            }


            resetForm()
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched, resetForm, setValues } = formik
    return (
        <div className='login-body'>
            <div className="login-container">
                <div className="login-box">

                    <h2>Login Now</h2>
                    {
                        type === 'otp' || type === 'activeOTP' ?
                            <>
                                <FormGroup >
                                    <Label >
                                        Enter OTP
                                    </Label>
                                    <Input
                                        name="otp"
                                        placeholder="OTP"
                                        type="text"
                                        variant="outlined"
                                        onChange={(e) => setUserOTP(e.target.value)}
                                        value={userOTP}
                                    />
                                </FormGroup>
                                <button
                                    className='login-button'
                                    type="button"
                                    onClick={handleOTP}

                                >
                                    SUBMIT
                                </button>

                            </> :
                            <form ref={form} onSubmit={handleSubmit}>
                                {
                                    type === 'signup' ?
                                        <FormGroup >
                                            <Label >
                                                Enter Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Name"
                                                type="text"
                                                fullwidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}

                                            />
                                            {errors.name && touched.name ? <span className='error_validation'>{errors.name}</span> : null}
                                        </FormGroup>
                                        :
                                        null
                                }
                                {
                                    type === 'verified' || type === 'newAccount' ? null :
                                        <FormGroup>
                                            <Label >
                                                Enter Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                type="email"
                                                fullwidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            {errors.email && touched.email ? <span className='error_validation'>{errors.email}</span> : null}

                                        </FormGroup>
                                }



                                {
                                    type === 'forgot_password' || type === 'verified' || type === 'newAccount' ? null :
                                        <FormGroup>
                                            <Label >
                                                Enter Password
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                type="password"
                                                fullwidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password ? <span className='error_validation'>{errors.password}</span> : null}
                                        </FormGroup>

                                }


                                {
                                    type === 'signup' ? <FormGroup>
                                        <Label >
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="confirm_password"
                                            name="confirm_password"
                                            placeholder="confirm Password"
                                            type="password"
                                            fullwidth
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirm_password}
                                        />
                                        {errors.confirm_password && touched.confirm_password ? <span className='error_validation'>{errors.confirm_password}</span> : null} </FormGroup>
                                        : null
                                }
                                {
                                    type === "verified" ?
                                        <FormGroup>
                                            <Label >
                                                Enter New Password
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                type="password"
                                                fullwidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password ? <span className='error_validation'>{errors.password}</span> : null}
                                            <Label >
                                                Confirm New Password
                                            </Label>
                                            <Input
                                                id="confirm_password"
                                                name="confirm_password"
                                                placeholder="confirm Password"
                                                type="password"
                                                fullwidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.confirm_password}
                                            />
                                            {errors.confirm_password && touched.confirm_password ? <span className='error_validation'>{errors.confirm_password}</span> : null}

                                        </FormGroup>
                                        : null
                                }
                                {
                                    type === 'newAccount' ? <>

                                    </> :
                                        null
                                }

                                {
                                    type === "login" ?
                                        <p>

                                            <a className='login-account' onClick={() => setType('forgot_password')}>
                                                Forgot password?
                                            </a>
                                        </p>
                                        :
                                        null
                                }

                                {
                                    type === "login" || type === "forgot_password" ? <>
                                        <p>
                                            Don’t have an account? {' '}
                                            <a className='login-account' onClick={() => setType('signup')}>
                                                Sign UP
                                            </a>
                                        </p>

                                    </>
                                        :
                                        null
                                }
                                {
                                    type === 'signup' ?
                                        <p> You have an account? {' '}
                                            <a className='login-account' onClick={() => setType('login')}>
                                                Login
                                            </a></p>

                                        :
                                        null
                                }

                                <button className='login-button' type="submit">{type === 'login' ? 'LOGIN' : type === 'signup' ? "REGISTRATION" : type === 'newAccount' ? "CREATE ACCOUNT" : type === "forgot_password" ? "SEND OTP" : "CREATE NEW PASSWORD"}</button>

                                <div className='google-btn-box'>
                                    <button type="button" className="google-sign-in-button">
                                        Sign in with Google
                                    </button>
                                </div>
                            </form>
                    }



                </div>
            </div>
        </div >
    );
}

export default Login;