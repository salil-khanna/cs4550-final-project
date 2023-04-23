import React from 'react';

import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from './home/Home';
import Search from './search/Search';
import Login from './login/Login';
import ForgetPassword from './login/ForgetPassword';
import Register from './register/Register';
import SelfProfile from './profile/SelfProfile';
import ProfileSlug from './profile/ProfileSlug';
import Bookmarks from './bookmarks/Bookmarks';
import Reviews from './reviews/Reviews';
import { ToastContainer } from 'react-toastify';
import Header from './header/Header';
import PageNotFound from './page-not-found/PageNotFound';
import Art from './artwork/Art';
import AppContext from './AppContext';

function App() {
  AppContext.link = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  return (
  <BrowserRouter>
    <div className="container">
        <Header />
        <Routes>
            <Route path="/*" element={<PageNotFound/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forget-password" element={<ForgetPassword/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<SelfProfile/>}/>
            <Route path="/profile/:user" element={<ProfileSlug/>}/>
            <Route path="/bookmarks" element={<Bookmarks/>}/>
            <Route path="/reviews/:user" element={<Reviews/>}/>
            <Route path="/art/:art_id" element={<Art/>}/>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={700}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
    </div>
  </BrowserRouter>
    
  );
}
export default App;
