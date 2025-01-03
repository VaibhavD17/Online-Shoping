import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../../Redux/Slice/Categorie.slice';

function Header(props) {
    const categories = useSelector(state => state.categories.categories)
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()

    const fData = cart.reduce((acc, v) => acc + v.qty, 0)
   
    

    const getData = () => {
        dispatch(getCategories())
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            {/* Topbar Start */}
            <div className="container-fluid">
                <div className="row bg-secondary py-1 px-xl-5">
                    <div className="col-lg-6 d-none d-lg-block">
                        {/* <div className="d-inline-flex align-items-center h-100">
                            <a className="text-body mr-3" href>About</a>
                            <a className="text-body mr-3" href>Contact</a>
                            <a className="text-body mr-3" href>Help</a>
                            <a className="text-body mr-3" href>FAQs</a>
                        </div> */}
                    </div>
                    <div className="col-lg-6 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My Account</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">Sign in</button>
                                    <button className="dropdown-item" type="button">Sign up</button>
                                </div>
                            </div>
                            {/* <div className="btn-group mx-2">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">USD</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">EUR</button>
                                    <button className="dropdown-item" type="button">GBP</button>
                                    <button className="dropdown-item" type="button">CAD</button>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">EN</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">FR</button>
                                    <button className="dropdown-item" type="button">AR</button>
                                    <button className="dropdown-item" type="button">RU</button>
                                </div>
                            </div> */}
                        </div>
                        <div className="d-inline-flex align-items-center d-block d-lg-none">
                            <a href className="btn px-0 ml-2">
                                <i className="fas fa-heart text-dark" />
                                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: 2 }}>2</span>
                            </a>
                            <a href className="btn px-0 ml-2">
                                <i className="fas fa-shopping-cart text-dark" />
                                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: 2 }}></span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                    <div className="col-lg-4 ">
                        <NavLink to={'/'} className="text-decoration-none nav-item nav-link">
                            <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
                            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                        </NavLink>
                    </div>
                    <div className="col-lg-4 col-6 text-left">
                        <form action>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for products" />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search" />
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            {/* Topbar End */}
            {/* Navbar Start */}
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: 65, padding: '0 30px' }}>
                            <h6 className="text-dark m-0"><i className="fa fa-bars mr-2" />Categories</h6>
                            <i className="fa fa-angle-down text-dark" />
                        </a>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: 'calc(100% - 30px)', zIndex: 999 }}>
                            <div className="navbar-nav w-100">
                                
                                {
                                    categories.map((v) => (
                                        <NavLink to={`/shop`}  key={v.id} className="nav-item nav-link">{v.categories}</NavLink>
                                    ))
                                }
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <a href className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <NavLink to={'/'} className="nav-item nav-link ">Home</NavLink>
                                    <NavLink to={'/shop'} className="nav-item nav-link">Shop</NavLink>
                                    {/* <NavLink to={'/shopDetails/:id'} className="nav-item nav-link">Shop Detail</NavLink> */}
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages <i className="fa fa-angle-down mt-1" /></a>
                                        <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                            <NavLink to={'/cart'} className="dropdown-item">Shopping Cart</NavLink>
                                            <NavLink to={'/checkout'} className="dropdown-item">Checkout</NavLink>
                                        </div>
                                    </div>
                                    <NavLink to={'/contact'} className="nav-item nav-link">Contact</NavLink>
                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <a href className="btn px-0">
                                        <i className="fas fa-heart text-primary" />
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: 2 }}>0</span>
                                    </a>
                                    <NavLink to={'/cart'} className="btn px-0 ml-3">
                                        <i className="fas fa-shopping-cart text-primary" />
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: 2 }}>{fData}</span>
                                    </NavLink>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar End */}

        </div>
    );
}

export default Header;