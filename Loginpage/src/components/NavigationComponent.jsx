export default function NavigationComponent(){
    return (<>
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full py-4 bg-transparent z-10">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold text-gray-800">
          {/* <img src={logoImage} alt="" style={{ width: '50px', height: 'auto' }}/> */}
            {/* <img src={textImage} alt="" style={{ width: '250px', height: 'auto' }}/> */}
            StockWise
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-indigo-900 hover:text-pink-800">
              Home
            </a>
            <a href="#" className="text-indigo-900 hover:text-pink-800">
              About
            </a>
            <a href="#" className="text-indigo-900 hover:text-pink-800">
              Contacts
            </a>
          </div>
          <div className="flex space-x-4">
            <button className="text-black-600 rounded-full px-4 py-2">
              Login
            </button>
            <button className="bg-blue-900 text-white rounded-full px-4 py-2">
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </>);
}