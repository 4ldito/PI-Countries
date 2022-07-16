import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About/About';
import CreateActivity from './CreateActivity/CreateActivity';
import Navbar from './NavBar/Navbar';
import Home from './Home/Home';

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/create-activities' element={<CreateActivity />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  )
}

export default AllRoutes