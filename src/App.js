import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<UserRoutes />}></Route>
        <Route path='/admin/*' element={<AdminRoutes />}></Route>
      </Routes>
    </div>
  );
}

export default App;
