import React from 'react';

const SidebarExDark = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-gray-800">
          <div className="flex flex-col flex-1 px-3 mt-6">
            <div className="space-y-4">
              <nav className="flex-1 space-y-2">
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
                  className="flex items-center px-4 py-[25%] text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
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
                  className="flex items-center px-4 py-[25%] text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
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
                  className="flex items-center px-4 py-[25%] text-sm font-medium text-gray-200 hover:text-white rounded-lg hover:bg-indigo-600 group no-underline"
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
          {/* Remove the py-6 padding */}
          <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
            {/* ADD YOUR CONTENT HERE */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SidebarExDark;
