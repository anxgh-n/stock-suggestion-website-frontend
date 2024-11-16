import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function NavigationComponent(){
  let navigate = useNavigate();

  function handleLogin(){
    navigate("/login");
  }

  function handleSignUp(){
    navigate("/signup");
  }

    return (<>
      {/* Navigation Bar */}
      <header className="shadow mb-2 sticky top-0 z-50 bg-white">
      <nav className="relative flex max-w-screen-xl flex-col overflow-hidden px-2 py-4 md:mx-auto md:flex-row md:items-center">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-3xl font-bold text-gray-800">
          {/* <img src={logoImage} alt="" style={{ width: '50px', height: 'auto' }}/> */}
            {/* <img src={textImage} alt="" style={{ width: '250px', height: 'auto' }}/> */}
            StockWise
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-indigo-900 hover:text-black-500 text-lg">
              Home
            </Link>
            <Link to="/about" className="text-indigo-900 hover:text-black-500 text-lg">
              About
            </Link>
          </div>
          <div className="flex space-x-4">
            <button className="text-black-600 rounded-full px-4 py-2"
            onClick={handleLogin}
            >
              Login
            </button>
            <button className="rounded-md border-2 border-indigo-900 px-6 py-1 font-medium text-indigo-900 transition-colors hover:bg-indigo-900 hover:text-white"
            onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
      </header>
    </>);
}