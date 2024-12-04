import React from 'react';
import Layout from '../admin/components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Categories from '../admin/containers/Categories/Categories';

function AdminRoutes(props) {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path='categories' element={<Categories />}></Route>
                </Routes>
            </Layout>
        </div>
    );
}

export default AdminRoutes;