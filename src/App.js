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
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <ShopContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/booking' element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path='/contact' element={<Contact />} />
            <Route path='/rate' element={<Rate />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/available-tables' element={
              <ProtectedRoute>
                <AvailableTables />
              </ProtectedRoute>
            } />
            <Route path='/booked-tables' element={
              <ProtectedRoute>
                <BookedTables />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ShopContextProvider>
      <ToastContainer position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  );
}

export default App;
