import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../containers/Home/Home';
import Cart from '../containers/Cart/Cart';
import Checkout from '../containers/Checkout/Checkout';
import ShopDetails from '../containers/ShopDetails/ShopDetails';
import { Route, Routes } from 'react-router-dom';
import Contacts from '../containers/Contacts/Contacts';
import Shop from '../containers/Shop/Shop';
import OrderSuccess from '../containers/OrderSuccess/OrderSuccess';
import Favorite from '../containers/Favorite/Favorite';
import Login from '../containers/Login/Login';
import MyOrder from '../containers/MyOrder/MyOrder';
import SubCategories from '../containers/SubCategories/SubCategories';
import Product from '../containers/Product/Product';

function UserRoutes(props) {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='cart' element={<Cart />}></Route>
                <Route path='shopDetails/:id' element={<ShopDetails />}></Route>
                <Route path='checkout' element={<Checkout />}></Route>
                <Route path='contact' element={<Contacts />}></Route>
                <Route path='shop' element={<Shop />}></Route>
                <Route path='ordersuccess' element={<OrderSuccess />}></Route>
                <Route path='favorite' element={<Favorite />}></Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='myorder' element={<MyOrder />}></Route>
                <Route path='subcategorie/:id' element={<SubCategories />}></Route>
                <Route path='product/:id' element={<Product />}></Route>
                <Route path='product' element={<Product />}></Route>
            </Routes>
            <Footer />

        </div>
    );
}

export default UserRoutes;