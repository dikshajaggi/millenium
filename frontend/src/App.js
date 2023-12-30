import MainLayout from './MainLayout';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout_components/Header';
import Categories from './components/Categories';
import Footer from './components/layout_components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import "./styles.scss"

function App() {
  const routes = ["/login", "/signup"]
  const location = useLocation()
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: "100vw", overflowX: "hidden" }}>
      <Header />
      {routes.includes(location.pathname) ? null : <Categories />}
      <div style={{ flex: '1' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
