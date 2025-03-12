import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/Slice/Categorie.slice';
import { getSubCategories } from '../../Redux/Slice/Subcategorie.slice';
import { NavLink, useParams } from 'react-router-dom';

function SubCategories(props) {
    const { id } = useParams()

    const productsData = useSelector(state => state.products.products)
    const products = productsData.filter((v) => v.status === 'active')

    const categoriesData = useSelector(state => state.categories.categories)
    const categories = categoriesData.filter((v) => v.status === 'active')

    const subcategoriesData = useSelector(state => state.subCategories.subCategories)
    const subCategories = subcategoriesData.filter((v) => v.status === 'active')

    const fData = subCategories.filter((v) => v.categories === id )

    const categorieName = categories.filter((v) => v.id === id)

    console.log(fData);

    console.log(categories);

    console.log(categorieName);



    const dispatch = useDispatch()

    const getData = () => {
        dispatch(getCategories())
        dispatch(getSubCategories())
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container-fluid pt-5">
            <h1 className="text-4xl font-bold text-center text-gray-800 my-4 cat-item align-items-center">
                <h1>{categorieName.map((v) => v.categories)}</h1>
            </h1>
            <div className="row px-xl-5 pb-3">
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <NavLink to={`/product/${id}`} className="text-decoration-none">
                        <div className="cat-item d-flex align-items-center mb-4">
                            <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                <img className="img-fluid" src="../img/subcategories.png" alt />
                            </div>
                            <div className="flex-fill pl-3">
                                <h6>All SubCategories</h6>
                                <small className="text-body"></small>
                            </div>
                        </div>
                    </NavLink>
                </div>
                {
                    fData.map((v) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <NavLink className="text-decoration-none" to={`/product/${v.id}`}>
                                <div className="cat-item d-flex align-items-center mb-4">
                                    <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                        <img className="img-fluid" src={"../img/" + v.subcat_img} alt />
                                    </div>
                                    <div className="flex-fill pl-3">
                                        <h6>{v.subcategories}</h6>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </div>

    );
}

export default SubCategories;