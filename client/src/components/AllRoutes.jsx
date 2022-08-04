import { Route, Routes } from 'react-router-dom';

import Navbar from './NavBar/Navbar';
import Home from './Home/Home';
import CreateActivity from './CreateActivity/CreateActivity';
import About from './About/About';
import CountryDetails from './CountryDetails/CountryDetails';
import Quiz from './Quiz/Quiz';
import PlayQuiz from './Quiz/PlayQuiz';
import Page404 from './404/Page404';

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<CountryDetails />} />
        <Route path='/create-activities' element={<CreateActivity />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/quiz/play' element={<PlayQuiz />} />
        <Route path='/about' element={<About />} />
        <Route path='/*' element={<Page404 />} />
      </Routes>
    </>
  )
}

export default AllRoutes