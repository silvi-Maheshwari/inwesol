import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ContactUsForm from './components/ContactUsForm';
import BlogList from './components/BlogList';
import './App.css';
// import './Navbar.css';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">MyWebsite</div>
        <ul className="nav-links">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/blog'}>Blog</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path='/' element={<ContactUsForm />} />
          <Route path='/blog' element={<BlogList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;