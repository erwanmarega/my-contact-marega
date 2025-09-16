import React from "react";
import { HomeIcon, UserIcon, Search, LogOut } from "lucide-react"; 

const Navbar = () => {
  return (
    <div className="flex ">
      <nav className="flex flex-col w-14 h-screen bg-gray-800 text-white shadow-lg">
        <div className="flex flex-col items-center mt-4 space-y-4">
          <a href="/dashboard" className="hover:bg-gray-700 p-3 rounded-lg">
            <HomeIcon className="w-6 h-6" />
          </a>
          <a href="/profile" className="hover:bg-gray-700 p-3 rounded-lg">
            <UserIcon className="w-6 h-6" />
          </a>
          <a href="#settings" className="hover:bg-gray-700 p-3 rounded-lg">
            <Search className="w-6 h-6" />
          </a>
            <a href="/logout" className="hover:bg-gray-700 p-3 rounded-lg mt-auto mb-4">
                <LogOut className="w-6 h-6" />
            </a>
        </div>
      </nav>

      
    </div>
  );
};

export default Navbar;
