import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import NavigationComponent from './components/NavigationComponent';
import { AuthProvider, useAuth } from './context/AuthContext';
import Questionaire from './pages/Questionaire';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          {/* Define the route that will wrap children with the Navigation */}
          <Route element={<LayoutWithNavAndFooter />}>
          <Route path="/about" element={<About/>}/>
          <Route path="/" element={<Home />} />
          </Route>
          
          {/* Other Routes */}
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/footer" element={<Footer/>}/>
          <Route path="/questionaire" element={<Questionaire/>}/>
          <Route
            path="/welcome"
            element={
              // <PrivateRoute>
                <Welcome />
              // </PrivateRoute>
            }
          />
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
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}


export default App;
