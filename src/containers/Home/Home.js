import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/Slice/Categorie.slice';
import { getProducts } from '../../Redux/Slice/Products.slice';
import { getSubCategories } from '../../Redux/Slice/Subcategorie.slice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { NavLink } from 'react-router-dom';
import { addtoCart } from '../../Redux/Slice/Cart.slice';
import { addtoFavorite } from '../../Redux/Slice/Favorite.slice';

function Home(props) {
    const [selectCategorie, setselectCategorie] = useState('')
    const dispatch = useDispatch();
    const favorite = useSelector(state => state.favorite.favorite)

 const auth = useSelector(state => state.auth.auth)

 console.log(auth);
 
    

    const productsData = useSelector(state => state.products.products)
    const products = productsData.filter((v) => v.status === 'active')

    const categoriesData = useSelector(state => state.categories.categories)
    const categories = categoriesData.filter((v) => v.status === 'active')



    const handleShortData = () => {
        const pData = products.reverse()

        pData.splice(4)






        // if (selectCategorie) {
        //     if (selectCategorie === 'all') {
        //         const categoriesID = categories.map((c) => c.id)

        //         const fData = pData.filter((v) => categoriesID.includes(v.categories) )

        //         return fData


        //     } else {
        //         const cData = pData.filter((v) => (
        //             v.categories === selectCategorie
        //         ))
        //         return cData;
        //     }
        // } else {
        //     const categoriesID = categories.map((c) => c.id)

        //         const fData = pData.filter((v) => categoriesID.includes(v.categories) )

        //         return fData
        // }

        return pData

    }



    const handleCart = (data) => {
        dispatch(addtoCart(data))
    }


    const handleFavorite = (data) => {
        dispatch(addtoFavorite(data))
    }

    const finalData = handleShortData();



    const getData = () => {
        dispatch(getCategories())
        dispatch(getProducts())
        dispatch(getSubCategories())
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            {/* Carousel Start */}
            <div className="container-fluid mb-3">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#header-carousel" data-slide-to={0} className="active" />
                                <li data-target="#header-carousel" data-slide-to={1} />
                                <li data-target="#header-carousel" data-slide-to={2} />
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item position-relative active" style={{ height: 430 }}>
                                    <img className="position-absolute w-100 h-100" src="img/carousel-1.jpg" style={{ objectFit: 'cover' }} />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: 700 }}>
                                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Men Fashion</h1>
                                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                            <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item position-relative" style={{ height: 430 }}>
                                    <img className="position-absolute w-100 h-100" src="img/carousel-2.jpg" style={{ objectFit: 'cover' }} />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: 700 }}>
                                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women Fashion</h1>
                                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                            <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item position-relative" style={{ height: 430 }}>
                                    <img className="position-absolute w-100 h-100" src="img/carousel-3.jpg" style={{ objectFit: 'cover' }} />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: 700 }}>
                                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids Fashion</h1>
                                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                            <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="product-offer mb-30" style={{ height: 200 }}>
                            <img className="img-fluid" src="img/offer-1.jpg" alt />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <a href className="btn btn-primary">Shop Now</a>
                            </div>
                        </div>
                        <div className="product-offer mb-30" style={{ height: 200 }}>
                            <img className="img-fluid" src="img/offer-2.jpg" alt />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <a href className="btn btn-primary">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Carousel End */}
            {/* Featured Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{ padding: 30 }}>
                            <h1 className="fa fa-check text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{ padding: 30 }}>
                            <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
                            <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{ padding: 30 }}>
                            <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div className="d-flex align-items-center bg-light mb-4" style={{ padding: 30 }}>
                            <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* Featured End */}
            {/* Categories Start */}
            <div className="container-fluid pt-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <NavLink to={`/product/all_cate`} className="text-decoration-none" onClick={() => setselectCategorie("all")} >
                            <div className="cat-item d-flex align-items-center mb-4">
                                <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                    <img className="img-fluid" src="img/cate2.webp" alt />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h6>All Categories</h6>
                                    <small className="text-body"></small>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    {
                        categories.map((v) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                                <NavLink to={`/subcategorie/${v.id}`} className="text-decoration-none" onClick={() => setselectCategorie(v.id)}>
                                    <div className="cat-item d-flex align-items-center mb-4">
                                        <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                            <img className="img-fluid" src={"../img/" + v.cat_img} alt />
                                        </div>
                                        <div className="flex-fill pl-3">
                                            <h6>{v.categories}</h6>
                                            <small className="text-body"></small>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    }


                </div>
            </div>
            {/* Categories End */}
            {/* Products Start */}
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">New Products </span></h2>

                <div className="row px-xl-5">
                    {
                        finalData.map((v) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                                <div className="product-item bg-light mb-4">
                                    {/* <span className="h5 categories_name">{categories.map((c) => c.id === v.categories ? c.categories : '')}</span> */}
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid product_image w-100" src={"../img/" + v.product_img} alt />
                                        <div className="product-action">
                                            <a onClick={() => handleCart(v)} className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
                                            <a onClick={() => handleFavorite(v)} className={`btn  btn-square btn-outline-dark `} href><i className={` ${favorite.includes(v.id) ? 'fas fa-heart ' : ' far fa-heart'} `} /></a>
                                        </div>
                                    </div>
                                    <NavLink to={`/shopDetails/${v.id}`} className="d-block text-center py-4">
                                    <div className="d-flex align-items-center justify-content-center mt-2 " >
                                            <h3>{v?.products}</h3>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mt-2 " >
                                            <h4>{v?.productsDesc}</h4>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mt-2 " >
                                            <h3><CurrencyRupeeIcon />{v.price}</h3>
                                        </div>

                                    </NavLink>

                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
            {/* Products End */}




        </div>

    );
}

export default Home;