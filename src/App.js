import React from 'react';

import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from './home/Home';
import Search from './search/Search';
import Login from './login/Login';
import Register from './register/Register';
import SelfProfile from './profile/SelfProfile';
import OtherProfile from './profile/OtherProfile';
import PageNotFound from './page-not-found/PageNotFound';

function App() {
  return (
<BrowserRouter>
   <div className="container">
       <Routes>
          <Route path="/*" element={<PageNotFound/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<SelfProfile/>}/>
          <Route path="/profile/:id" element={<OtherProfile/>}/>
       </Routes>
   </div>
</BrowserRouter>
  );
}
export default App;
