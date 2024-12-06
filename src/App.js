import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { Provider } from 'react-redux';
import { storeData } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  const { store, persistor } = storeData()
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes>
          <Route path='/*' element={<UserRoutes />}></Route>
          <Route path='/admin/*' element={<AdminRoutes />}></Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
