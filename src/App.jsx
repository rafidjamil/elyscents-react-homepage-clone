

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

<<<<<<< HEAD

=======
// import ProductCard from './components/perfumecard';
>>>>>>> 6fd7f966014d4d957dde350c0cc226c3786c05a4
import MyNavbar from './components/Navbar';
import Footer from './components/footer';
import { Routes, Route } from 'react-router-dom'
import Mycataloge from './Cataloge';

import ProductPage from './Productpage'
import CartModal from './Addtocart';
import Checkout from './checkout';
import SearchModal from './overlay/Overlay'

import Login from './Login'
import UserProfile from './UserProfile'
import Beauty from './components/Beauty';
import ThankYou from './components/Thankyou';

import Home from './Home';

function ColorSchemesExample() {

  return (
    <>
      <p className="top-bar"> BUY ANY TWO PERFUMES AND GET FREE SHIPPING. </p>

      <MyNavbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cataloge' element={<Mycataloge />} />
        <Route path='/Thankyou' element={<ThankYou />} />

        <Route path='/product/:id' element={<ProductPage />} />
        {/* <Route path="/product/:id" element={<Productpage />} /> */}
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<UserProfile />} />
        <Route path='/collection/:category' element={<Beauty />} />
      </Routes>

      <Footer />

      <CartModal />
      <SearchModal />

    </>
  );
}


export default ColorSchemesExample;
