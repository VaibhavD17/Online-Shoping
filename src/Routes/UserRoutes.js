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
            </Routes>
            <Footer />

        </div>
    );
}

export default UserRoutes;