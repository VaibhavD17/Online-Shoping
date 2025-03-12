import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { addContact } from '../../Redux/Slice/Contact.slice';

function Contacts(props) {
    const dispatch = useDispatch()

    const handleAdd = (data) =>{
        dispatch(addContact(data))
    }


    let contactSchema = object({
        name: string().required("Please enter name"),
        email: string().email().required("Please enter email"),
        subject: string().required("Please enter subject"),
        message: string().required("Please enter message")
            .test('message', "meassage minimum 10 word", function (value) {
                let arr = value.trim().split(' ')

                let data = arr.filter((v) => v !== '')

                if (data.length < 10) {
                    return false
                } else {
                    return true
                }
            })

    });


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: contactSchema,
        onSubmit: (values) => {
           handleAdd(values)
           resetForm()

        },
    });

    // const getData = () => {

    // }

    // useEffect(()=>{
    //     getData()
    // }, [])

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, resetForm } = formik


    return (
        <div>
            {/* Contact Start */}
            <div className="container-fluid">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Contact Us</span></h2>
                <div className="row px-xl-5">
                    <div className="col-lg-7 mb-5">
                        <div className="contact-form bg-light p-30">
                            <div id="success" />
                            <form onSubmit={handleSubmit} id="contactForm" noValidate="novalidate">
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Your Name"
                                        name='name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />

                                    <p className="help-block text-danger">{errors.name && touched.name ? errors.name : ''} </p>
                                </div>
                                <div className="control-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Your Email"
                                        name='email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <p className="help-block text-danger">{errors.email && touched.email ? errors.email : ''} </p>
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        placeholder="Subject"
                                        name='subject'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.subject}
                                    />
                                    <p className="help-block text-danger">{errors.subject && touched.subject ? errors.subject : ''} </p>
                                </div>
                                <div className="control-group">
                                    <textarea
                                        className="form-control"
                                        rows={8} id="message"
                                        placeholder="Message"
                                        defaultValue={""}
                                        name='message'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.message}
                                    />
                                    <p className="help-block text-danger">{errors.message && touched.message ? errors.message : ''} </p>
                                </div>
                                <div>
                                    <button className="btn btn-primary py-2 px-4" type="submit" >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-5">
                        <div className="bg-light p-30 mb-30">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d45154.813778506!2d72.89064333685764!3d21.227618050985715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be045af3a2ac197%3A0xe74f8c0ca1817b6f!2sBitKhanan%20IT%20Education!5e0!3m2!1sen!2sbd!4v1740805170625!5m2!1sen!2sbd" style={{ width: '100%', height: 250 }} frameBorder={0} allowFullScreen aria-hidden="false" tabIndex={0}></iframe>
                        </div>
                        <div className="bg-light p-30 mb-3">
                            <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />510, Kyros Business Centre, Surat, Gujarat 395006, India</p>
                            <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />bitkhanan@gmail.com</p>
                            <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3" />+91 8866173826</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
        </div>

    );
}

export default Contacts;