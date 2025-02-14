import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Slice/Products.slice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { NavLink } from 'react-router-dom';
import { addtoFavorite } from '../../Redux/Slice/Favorite.slice';
import { addtoCart } from '../../Redux/Slice/Cart.slice';

function Favorite(props) {
    const dispatch = useDispatch()
    const favorite = useSelector(state => state.favorite.favorite)
    const products = useSelector(state => state.products.products)



    const fData = favorite.map((v) => {
        const pData = products.find((v1) => v1.id === v)

        return pData;
    })

    console.log(fData);


    const handleFavorite = (data) => {
        dispatch(addtoFavorite(data))

    }

      const handleCart = (data) => {
            dispatch(addtoCart(data))
        }


    const getData = () => {
        dispatch(getProducts())
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Like Products </span></h2>
                <div className="row px-xl-5">
                    {
                        fData?.map((v) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                                <div className="product-item bg-light mb-4 p-1">

                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100 product_image" src={"../img/"+ v.product_img} alt />

                                        <div className="product-action">
                                            <a onClick={() => handleCart(v)} className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
                                            <a onClick={() => handleFavorite(v)} className={`btn  btn-square btn-outline-dark `} href><i className={` ${favorite.includes(v.id) ? 'fas fa-heart ' :' far fa-heart'} `} /></a>
                                            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
                                            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
                                        </div>
                                    </div>
                                    <NavLink to={`/shopDetails/${v?.id}`} className="d-block text-center py-4">
                                        <a className="h4 text-decoration-none text-truncate" href>{v?.products}</a>
                                        <div className="d-flex align-items-center justify-content-center mt-2 " >
                                            <h3><CurrencyRupeeIcon />{v?.price}</h3>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    );
}

export default Favorite;