import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { getProducts } from '../../Redux/Slice/Products.slice';
import { addtoCart } from '../../Redux/Slice/Cart.slice';
import { addtoFavorite } from '../../Redux/Slice/Favorite.slice';
function Product(props) {

    const { id } = useParams()
    const dispatch = useDispatch()
    const favorite = useSelector(state => state.favorite.favorite)

    const productsData = useSelector(state => state.products.products)
    const products = productsData.filter((v) => v.status === 'active')

    const cat_id = products.filter((v) => v.categories === id)
    const subcat_id = products.filter((v) => v.subcategories === id)

    const handleCart = (data) => {
        dispatch(addtoCart(data))
    }
    const handleFavorite = (data) => {
        dispatch(addtoFavorite(data))
    }

    const fData = products.filter((v) => {
        if (cat_id.length > 0) {
            return id === v.categories
        } else if (subcat_id.length > 0) {
            return v.subcategories === id
        } else if (id === 'all_cate') {
            return v
        } else if (!id) {
            return ' '
        }
    })

    const getData = () => {
        dispatch(getProducts())
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products </span></h2>

                <div className="row px-xl-5">
                    {
                        fData.map((v) => (
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
        </div>
    );
}

export default Product;