import MainLayout from './MainLayout';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout_components/Header';
import Categories from './components/Categories';
import Footer from './components/layout_components/Footer';
import { Outlet } from 'react-router-dom';
import "./styles.scss"

function App() {
  return (
    <div className="App">
      <Header />
      <Categories />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
