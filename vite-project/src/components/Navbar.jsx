import React from "react";
import "tailwindcss";




function Navbar() {
    return (
        <>
           
           <div className="bg-gray-100 min-h-screen flex flex-col  pt-8">
      <h1 className="text-3xl font-bold mb-4 text-top">My Website</h1>
      <nav className="flex space-x-6 text-lg font-medium">
        <a href="#" className="text-blue-600 hover:underline">Option1</a>
        <a href="#" className="text-blue-600 hover:underline">Option2</a>
        <a href="#" className="text-blue-600 hover:underline">Option3</a>
      </nav>
    </div>

        </>
    );
}

export default Navbar