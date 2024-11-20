import React from 'react';
import sidebarimg from "../Images/athenasidebar.jpg";
 
const Profile = () => {
 return (
  <div className="flex h-screen"  >
   {/* Sidebar */}
   <div className="hidden md:flex md:w-80 md:flex-col  bg-transparent shadow-lg"
   style={{
    backgroundImage: `url(${sidebarimg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}>
    <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-transparent"
   >
    
     <div className="px-4 mt-8">
      <label htmlFor="search" className="sr-only">
       Search
      </label>
      
     </div>
     <div className="px-4 mt-6">
      <hr className="border-gray-700" />
     </div>
     <div className="flex flex-col flex-1 px-3 mt-6">
      <div className="space-y-4">
       <nav className="flex-1 space-y-2">
        {/* Dashboard Link */}
        <a
         href="#"
         className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg group no-underline"
        >
         <svg
          className="flex-shrink-0 w-5 h-5 mr-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
         </svg>
         Dashboard
        </a>
        {/* Home Link */}
        <a
         href="#"
         className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
        >
         <svg
          className="flex-shrink-0 w-5 h-5 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
         </svg>
         Home
        </a>
        {/* Profile Link */}
        <a
         href="#"
         className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
        >
         <svg
          className="flex-shrink-0 w-5 h-5 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M12 14a7 7 0 10-7-7 7 7 0 007 7zM12 14a7 7 0 107 7 7 7 0 00-7-7z"
          />
         </svg>
         Profile
        </a>
        {/* Add Talent Post Link */}
        <a
         href="#"
         className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
        >
         <svg
          className="flex-shrink-0 w-5 h-5 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M19 12h-6m0 0H7m0 0l4-4m0 0l4 4"
          />
         </svg>
         Add Talent Post
        </a>
        {/* View Shortlisted Link */}
        <a
         href="#"
         className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
        >
         <svg
          className="flex-shrink-0 w-5 h-5 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
         </svg>
         View Shortlisted
        </a>
        {/* Applicants Link */}
        <a
         href="#"
         className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
        >
         <svg
          className="flex-shrink-0 w-5 h-5 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
         </svg>
         Applicants
        </a>
        {/* Sign Out Link */}
        <a
         href="#"
         className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
        >
         <svg
          className="flex-shrink-0 w-5 h-5 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="M17 16l4-4m0 0l-4-4m4 4H3"
          />
         </svg>
         Sign Out
        </a>
       </nav>
      </div>
     </div>
    </div>
   </div>
   {/* Main Content */}
   <div className="flex flex-col flex-1 bg-gray-900">
    <main>
     <div className="py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
       {/* ADD YOUR CONTENT HERE */}
      </div>
     </div>
    </main>
   </div>
  </div>
 );
};
export default Profile;