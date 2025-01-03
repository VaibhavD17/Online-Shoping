import React, { useEffect } from 'react';
import { getProducts } from '../../Redux/Slice/Products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Field, useFormik } from 'formik';
import { object, string, boolean } from 'yup';

function Checkout(props) {
    const dispatch = useDispatch();
    let location = useLocation();

    const cart = useSelector(state => state.cart.cart)
    const products = useSelector(state => state.products.products)

    const fData = cart.map((v) => {
        const Pdata = products.find((v1) => v.pid === v1.id)

        return { ...Pdata, qty: v.qty }
    })

    console.log(fData);

    console.log(location.state);
    
    


    const discounts =   location?.state?.discount ? location?.state?.discount : 0 ;
    const Subtotal = fData.reduce((acc, v) => acc + (v.price * v.qty), 0);
    const discount_amount = discounts ?  ( Subtotal * discounts) / 100 : 0;
    const total = Subtotal - discount_amount;


    const getData = () => {
        dispatch(getProducts)
    }

    useEffect(() => {
        getData()        
    }, [])

    let checkoutSchema = object({
        fname: string()
            .required("Please enter first name")
            .matches(/^[a-zA-Z '.-]*$/, "Please enter valid first name"),

        Lname: string()
            .required("Please enter last name")
            .matches(/^[a-zA-Z '.-]*$/, "Please enter valid last name"),

        email: string()
            .email("please enter valid email")
            .required("Please enter email"),

        mobile: string()
            .required("Please enter mobile number")
            .matches(/^[0-9]+$/, "Please enter valid mobile number")
            .min(10, 'Mobile number Must be 10 digits')
            .max(10, 'Mobile number Must be 10 digits'),

        address: string()
            .required("Please enter address")
            .test("address", "Address must be max 10 words", function (value) {
                let arr = value.trim().split(' ')

                if (arr.length > 10) {
                    return false
                } else {
                    return true
                }
            }),

        country: string()
            .required("Please enter country name")
            .matches(/^[a-zA-Z '.-]*$/, "Please enter valid country name")
            .min(2, "Country name must be min 2 latter required.")
            .max(50, "Country name must be within 50 latters."),

        city: string()
            .required("Please enter city name")
            .matches(/^[a-zA-Z '.-]*$/, "Please enter valid city name")
            .min(2, "city name must be min 2 latter required.")
            .max(50, "city name must be within 50 latters."),

        state: string()
            .required("Please enter state name")
            .matches(/^[a-zA-Z '.-]*$/, "Please enter valid state name")
            .min(2, "state name must be min 2 latter required.")
            .max(50, "state name must be within 50 latters."),

        zipcode: string()
            .required("Please enter zipcode")
            .matches(/^[0-9]+$/, "Please enter valid zipcode")
            .min(6, 'zipcode Must be 6 exactly digits')
            .max(6, 'zipcode Must be 6 exactly digits'),

        check: boolean()
            .oneOf([true], "please Create an account"),

        payment: string().required("Please select option")


    });

    const formik = useFormik({
        initialValues: {
            fname: '',
            Lname: '',
            email: '',
            mobile: '',
            address: '',
            country: '',
            city: '',
            state: '',
            zipcode: '',
            check: false,
            payment: ''
        },
        validationSchema: checkoutSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);


            resetForm()

        },
    });

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, resetForm, setValues } = formik


    return (
        <div>
            {/* Checkout Start */}
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <div className="row px-xl-5">
                        <div className="col-lg-8">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>First Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="First Name"
                                            name='fname'
                                            value={values.fname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.fname && touched.fname ? errors.fname : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Last Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Last Name"
                                            name='Lname'
                                            value={values.Lname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.Lname && touched.Lname ? errors.Lname : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>E-mail</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="E-mail"
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.email && touched.email ? errors.email : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Mobile No</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Mobile No"
                                            name='mobile'
                                            value={values.mobile}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.mobile && touched.mobile ? errors.mobile : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Address</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Address"
                                            name='address'
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.address && touched.address ? errors.address : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Country</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="country"
                                            name='country'
                                            value={values.country}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.country && touched.country ? errors.country : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>City</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="City"
                                            name='city'
                                            value={values.city}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.city && touched.city ? errors.city : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>State</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="State"
                                            name='state'
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.state && touched.state ? errors.state : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>ZIP Code</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="ZIP Code"
                                            name='zipcode'
                                            value={values.zipcode}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className='error_validation'>{errors.zipcode && touched.zipcode ? errors.zipcode : ''}</span>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="newaccount"
                                                name='check'
                                                value={values.check}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <label className="custom-control-label" htmlFor="newaccount">Create an account</label>
                                        </div>
                                        <span className='error_validation'>{errors.check && touched.check ? errors.check : ''}</span>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom">
                                    <h6 className="mb-3">Products</h6>
                                    {
                                        fData.map((v) => (
                                            <div className="d-flex justify-content-between">
                                                <p>{v.products}</p>
                                                <p>{v.price}</p>
                                            </div>
                                        ))
                                    }


                                </div>
                                <div className="border-bottom pt-3 pb-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6>SubTotal</h6>
                                        <h6>{Subtotal}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between  mb-3">
                                        <h6 className="font-weight-medium">discount</h6>
                                        <h6 className="font-weight-medium">{discounts + '%'}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between  mb-3">
                                        <h6 className="font-weight-medium">discount Amount</h6>
                                        <h6 className="font-weight-medium">${discount_amount}</h6>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Billing Amount</h5>
                                        <h5>${total}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                                <div className="bg-light p-30">
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="paypal"
                                                value={'paypal'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="directcheck"
                                                value={'directcheck'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label className="custom-control-label" htmlFor="directcheck">Direct Check</label>
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="banktransfer"
                                                value={'banktransfer'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label className="custom-control-label" htmlFor="banktransfer">Bank Transfer</label>
                                        </div>
                                    </div>
                                    <span className='error_validation'>{errors.payment && touched.payment ? errors.payment : ''}</span>

                                    <button type='submit' className="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* Checkout End */}
        </div>

    );
}

export default Checkout;