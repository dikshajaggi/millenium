import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Categories from './components/Categories';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import "./styles.scss"
import { useState } from 'react';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const routes = ["/login", "/signup", "/contact", "/about", "/blog", "/terms_conditions"]
  const [category, setCategory] = useState("all")
  const location = useLocation()
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      {routes.includes(location.pathname) ? null : <Categories category={category} setCategory={setCategory} />}
      <div className='main'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
