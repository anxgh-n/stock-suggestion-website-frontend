import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useNavigationType } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react'; // Lottie for animation
import loadingAnimation from './images/loading.json'; // Import your Lottie animation
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Footer from './components/Footer';
import NavigationComponent from './components/NavigationComponent';
import { AuthProvider } from './context/AuthContext';
import MainHeader from './components/MainHeader';
import Profile from './pages/Profile';
import Questionaire from './pages/Questionaire';
import TickerHeader from './components/TickerHeader';
import CryptoData from './pages/CryptoData';
import Filter from './pages/Filter';
import About from './pages/About';
import Watchlist from './pages/Watchlist';
import News from './pages/News';
import NotificationPage from './pages/NotificationPage';
import ProfileHeader from './components/ProfileHeader';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [isLoading, setIsLoading] = useState(false); // Global loading state

  const styles = {
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.8', // Background for the loading screen
    },
    animation: {
      width: '200px',
    },
  };

  return (
    <AuthProvider>

      <BrowserRouter>
        <Toaster position="top-center" />
        <TickerHeader />
        {isLoading && (
          <div style={styles.loadingContainer}>
            <Lottie animationData={loadingAnimation} style={styles.animation} />
          </div>
        )}
        
        <Routes>
          <Route element={<LayoutWithNavAndFooter setIsLoading={setIsLoading} />}>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<LoginHeader setIsLoading={setIsLoading} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </Route>

          

          <Route element={<ProfileMainHeader setIsLoading={setIsLoading} />}>
            
           
          </Route>
          <Route path="/profile" element={<Profile />} />
           
          <Route element={<LayoutWithMainHeader setIsLoading={setIsLoading} />}>
            
            <Route path="/welcome" element={<Welcome />} />
            <Route path = "/notifications" element={<NotificationPage/>}/>
            <Route path="/news" element={<News/>}></Route>
            <Route path="/docs" element={<Documentation />} />
            <Route path="/questionaire" element={<Questionaire />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/crypto/:id" element={<CryptoData />} />
          </Route>
          <Route path ="/profilepage" element={<ProfilePage/>}></Route>
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Layout with Navbar and Footer
function LayoutWithNavAndFooter({ setIsLoading }) {
  useLoadingEffect(setIsLoading);
  return (
    <>
      <NavigationComponent />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

function LayoutWithMainHeader({ setIsLoading }) {
  useLoadingEffect(setIsLoading);
  return (
    <>
      <MainHeader />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

function ProfileMainHeader({ setIsLoading }) {
  useLoadingEffect(setIsLoading);
  return (
    <>
      <ProfileHeader />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

function LoginHeader({ setIsLoading }) {
  useLoadingEffect(setIsLoading);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </>
  );
}

// Custom hook to handle loading state on navigation
function useLoadingEffect(setIsLoading) {
  const navigationType = useNavigationType();

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust loading time as needed

    return () => clearTimeout(timer);
  }, [navigationType, setIsLoading]);
}

export default App;
