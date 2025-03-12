import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { getCategories } from '../../Redux/Slice/Categorie.slice';
import { getProducts } from '../../Redux/Slice/Products.slice';
import { getSubCategories } from '../../Redux/Slice/Subcategorie.slice';
import { NavLink, useParams } from 'react-router-dom';
import { addtoCart } from '../../Redux/Slice/Cart.slice';
import { addtoFavorite } from '../../Redux/Slice/Favorite.slice';

function Shop(props) {

    const [selectCategorie, setselectCategorie] = useState('')
    const dispatch = useDispatch();
    const productsData = useSelector(state => state.products.products)
    const favorite = useSelector(state => state.favorite.favorite)

    const products = productsData.filter((v) => v.status === 'active')

    const categoriesData = useSelector(state => state.categories.categories)
    const categories = categoriesData.filter((v) => v.status === 'active')


    const handleShortData = () => {

        const pData = products.reverse()
        pData.splice(4)

        // if (selectCategorie) {
        //     if (selectCategorie === 'all') {
        //         const categoriesID = categories.map((v) => v.id)

        //         const fData = pData.filter((v) => categoriesID.includes(v.categories))

        //         return fData
        //     } else {
        //         const cData = pData.filter((v) => (
        //             v.categories === selectCategorie
        //         ))
        //         return cData;
        //     }
        // } else {
        //     const categoriesID = categories.map((v) => v.id)

        //     const fData = pData.filter((v) => categoriesID.includes(v.categories))

        //     return fData
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
            {/* Categories Start */}
            <div className="container-fluid pt-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" onClick={() => setselectCategorie("all")} >
                            <div className="cat-item d-flex align-items-center mb-4">
                                <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                    <img className="img-fluid" src="img/cate2.webp" alt />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h6>All Categories</h6>
                                    <small className="text-body"></small>
                                </div>
                            </div>
                        </a>
                    </div>
                    {
                        categories.map((v) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                                <a className="text-decoration-none" onClick={() => setselectCategorie(v.id)}>
                                    <div className="cat-item d-flex align-items-center mb-4">
                                        <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                            <img className="img-fluid" src={"../img/" + v.cat_img} alt />
                                        </div>
                                        <div className="flex-fill pl-3">
                                            <h6>{v.categories}</h6>
                                            <small className="text-body"></small>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }


                </div>
            </div>
            {/* Categories End */}
            {/* Products Start */}
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products </span></h2>

                <div className="row px-xl-5">
                    {
                        finalData.map((v) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                                <div className="product-item bg-light mb-4">
                                    {/* <span className="h5 categories_name">{categories.map((c) => c.id === v.categories ? c.categories : '')}</span> */}
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100 product_image" src={"../img/" + v.product_img} alt />
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

export default Shop;