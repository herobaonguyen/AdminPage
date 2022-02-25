import logo from './logo.svg';
import './App.css';
import './sass/main.scss'
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import  LoginPage  from './pages/LoginPage/LoginPage';
import { MainTemplate } from './templates/MainTemplate/MainTemplate';
import { AdminPage } from './pages/AdminPage/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainTemplate/>}>
          <Route path="" element={<LoginPage/>}/>
          <Route path="admin" element={<AdminPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
