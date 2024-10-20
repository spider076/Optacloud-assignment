import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full shadow-md">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Assignment</h1>
            </div>
            <div className="hidden sm:flex sm:ml-6">
              <div className="flex space-x-4">
                <span className="text-gray-800">John Doe</span>
                <a
                  href="/signin"
                  className="px-3 py-2 rounded-md text-sm font-medium text-indigo-600 bg-white border border-indigo-600 hover:text-indigo-900 hover:border-indigo-900"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
