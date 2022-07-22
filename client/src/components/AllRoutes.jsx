import { Route, Routes } from 'react-router-dom';

import About from './About/About';
import CreateActivity from './CreateActivity/CreateActivity';
import Navbar from './NavBar/Navbar';
import Home from './Home/Home';
import CountryDetails from './CountryDetails/CountryDetails';
import Page404 from './404/Page404';

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/create-activities' element={<CreateActivity />} />
        <Route path='/about' element={<About />} />
        <Route path='/details/:id' element={<CountryDetails />} />
        <Route path='/*' element={<Page404 />} />
      </Routes>
    </>
  )
}

export default AllRoutes