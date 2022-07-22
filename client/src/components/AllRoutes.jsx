import { Route, Routes } from 'react-router-dom';

import About from './About/About';
import CreateActivity from './CreateActivity/CreateActivity';
import Navbar from './NavBar/Navbar';
import Home from './Home/Home';
import CountryDetails from './CountyDetails/CountryDetails';

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/create-activities' element={<CreateActivity />} />
        <Route path='/about' element={<About />} />
        <Route path='/details/:id' element={<CountryDetails />} />
      </Routes>
    </>
  )
}

export default AllRoutes