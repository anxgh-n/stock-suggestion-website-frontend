import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Footer from './components/Footer';
import NavigationComponent from './components/NavigationComponent';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainHeader from './components/MainHeader';
import Profile from './pages/Profile';
import Questionaire from './pages/Questionaire';
import TickerHeader from './components/TickerHeader';
import CryptoData from './pages/CryptoData';
import Filter from './pages/Filter';

// const PrivateRoute = ({ children }) => {
//   const { token } = useAuth();
//   return token ? <>{children}</> : <Navigate to="/login" />;
// };

function App() {
  return (
    
    <AuthProvider>
      
      <BrowserRouter>
        <Toaster position="top-center" />
        <TickerHeader/>
        <Routes>
          {/* Define the route that will wrap children with the Navigation */}
          <Route element={<LayoutWithNavAndFooter />}>
          <Route path="/about" element={<Documentation/>}/>
          <Route path="/" element={<Home />} />
          </Route>
          
          {/* Other Routes */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/questionaire" element={<Questionaire />} ></Route> */}


          <Route element={<LayoutWithMainHeader/>}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/questionaire" element={<Questionaire/>}/>
            <Route path='/filter' element={<Filter></Filter>}></Route>
            <Route path="/crypto/:id" element={<CryptoData />} />
          </Route>

          {/* <Route
            path="/welcome"
            element={
              // <PrivateRoute>
                <Welcome />
              // </PrivateRoute>
            }
          /> */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Layout with Navbar and Footer
function LayoutWithNavAndFooter() {
  return (
    <>
      <NavigationComponent />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* this allows each layout to render its respective component */}
          <Outlet/>
        {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> </Routes> */}
        </main>
        <Footer />
      </div>
    </>
  );
}

function LayoutWithMainHeader() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet/>
        {/* <Routes>
        <Route path="/welcome" element={<Welcome />} /></Routes> */}
        </main>
        <Footer />
      </div>
    </>
  );
}




export default App;
