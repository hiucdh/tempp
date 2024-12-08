import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Menu from './Pages/Menu';
import Contact from './Pages/Contact';
import Rate from './Pages/Rate';
import Booking from './Pages/Booking';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import ShopContextProvider from './Context/ShopContext';
import AvailableTables from './Pages/AvailableTables';
import BookedTables from './Pages/BookedTables';

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/rate' element={<Rate />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/available-tables' element={<AvailableTables />} />
          <Route path='/booked-tables' element={<BookedTables />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
