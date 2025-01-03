import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, deleteCart, increment } from '../../Redux/Slice/Cart.slice';
import { getCoupon } from '../../Redux/Slice/Coupon.slice';
import { getProducts } from '../../Redux/Slice/Products.slice';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { NavLink } from 'react-router-dom';

function Cart(props) {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.cart)
    const products = useSelector(state => state.products.products)
    const coupon = useSelector(state => state.coupon.coupon)
    const [discount, setDiscount] = useState('')

    const fData = cart.map((v) => {
        const pData = products.find((v1) => v1.id === v.pid)

        return { ...pData, qty: v.qty }
    })

    const handleIncrement = (id) => {
        dispatch(increment(id))
    }

    const handleDecrement = (id) => {
        dispatch(decrement(id))
    }

    const handleDeleteCart = (id) => {
        dispatch(deleteCart(id))
    }

    


    const getData = () => {
        dispatch(getCoupon())
        dispatch(getProducts())
    }

    useEffect(() => {
        getData();
    }, [])

    let codeSchema = object({
        code: string()
            .required('Please Enter Coupon Code')
            .test('code', "Invalide Coupon Code", function (value) {
                let flag = false;

                coupon.map((v) => {
                    if (v.code === value) {
                        flag = true
                        setDiscount(v.discount)
                    }
                })

                if (flag) {
                    return true
                } else {
                    return false
                }
            })
        ,
    });

    const formik = useFormik({
        initialValues: {
            code: '',

        },
        validationSchema: codeSchema,
        onSubmit: (values, action, { resetForm }) => {

            action.setSubmitting(false)

            resetForm()
        },
    });

    const { handleSubmit, handleChange, handleBlur, resetForm, setValues, values, errors, touched, setSubmitting , isSubmitting} = formik

    
    const subtotal = fData.reduce((acc, v) => acc + (v.price * v.qty), 0);
    const totalDiscount = isSubmitting && discount ? (subtotal * discount) / 100 : 0;
    const total = subtotal - totalDiscount;


    return (
        <div>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <a className="breadcrumb-item text-dark" href="#">Shop</a>
                            <span className="breadcrumb-item active">Shopping Cart</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}
            {/* Cart Start */}
            <div className="container-fluid">

                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {
                                    fData.map((v) => (
                                        <tr>
                                            <td className="align-middle">{v.products}</td>
                                            <td className="align-middle">{v.price}</td>
                                            <td className="align-middle">
                                                <div className="input-group quantity mx-auto" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handleDecrement(v.id)} className="btn btn-sm btn-primary btn-minus">
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" value={v.qty} />
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handleIncrement(v.id)} className="btn btn-sm btn-primary btn-plus">
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">{v.price * v.qty}</td>
                                            <td className="align-middle"><button onClick={() => handleDeleteCart(v.id)} className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control border-0 p-4"
                                    placeholder="Coupon Code"
                                    name='code'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.code}
                                />

                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                                <span
                                    style={{
                                        color: 'red',
                                        width: "100%"
                                    }}>
                                    {errors.code && touched.code ? errors.code : ''}
                                </span>
                            </div>
                        </form>
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>SubTotal</h6>
                                    <h6>{subtotal}</h6>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <h6 className="font-weight-medium">Discount</h6>
                                    <h6 className="font-weight-medium">{isSubmitting && discount  ?  discount + "%" : 0 }</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Discount Amount</h6>
                                    <h6 className="font-weight-medium">{totalDiscount}</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>{total}</h5>
                                </div>
                                <NavLink
                                 to={{pathname:'/checkout'}}
                                 state={{discount:discount}}
                                 >
                                    <button type='button' className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Cart End */}
        </div>

    );
}

export default Cart;