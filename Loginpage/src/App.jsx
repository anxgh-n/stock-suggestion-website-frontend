import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import NavigationComponent from './components/NavigationComponent';
import { AuthProvider, useAuth } from './context/AuthContext';

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
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Other Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/welcome"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// This component wraps the children with the Navigation
function WithNav() {
  return (
    <>
      <NavigationComponent />
      {/* Render the child components (Home, etc.) here */}
      <Routes>
        {/* The Home route should now work and render inside WithNav */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
