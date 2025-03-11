import React from "react";
import { usePrivy } from "@privy-io/react-auth";

export default function Navbar() {
  const { login, logout, user } = usePrivy();
  return (
    <nav className="sticky top-0 z-10 backdrop-blur-sm bg-white/80 border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">Story Smart Wallet Demo</div>
        <button
          onClick={user ? logout : login}
          className={`rounded-md text-sm font-medium h-10 px-5 py-2 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            user
              ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
              : "bg-black text-white hover:bg-gray-800 focus:ring-gray-900"
          }`}
        >
          {user ? "Logout" : "Login with Privy"}
        </button>
      </div>
    </nav>
  );
}
