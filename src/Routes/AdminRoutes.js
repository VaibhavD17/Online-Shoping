import React from 'react';
import Layout from '../admin/components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Categories from '../admin/containers/Categories/Categories';
import SubCategories from '../admin/containers/SubCategories/SubCategories';
import Products from '../admin/containers/Products/Products';
import Coupon from '../admin/containers/Coupon/Coupon';
import OrderList from '../admin/containers/OrderList/OrderList';
import Contact from '../admin/containers/Contact/Contact';

function AdminRoutes(props) {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path='categories' element={<Categories />}></Route>
                    <Route path='subcategories' element={<SubCategories />}></Route>
                    <Route path='products' element={<Products />}></Route>
                    <Route path='coupon' element={<Coupon />}></Route>
                    <Route path='orderList' element={<OrderList />}></Route>
                    <Route path='contact' element={<Contact />}></Route>
                </Routes>
            </Layout>
        </div>
    );
}

export default AdminRoutes;