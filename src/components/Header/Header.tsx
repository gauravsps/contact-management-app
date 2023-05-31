import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const renderLabel = () => {
    switch (pathName) {
      case "/":
        return "Contact";
      case "/map":
        return "Maps and chart";
      case "/new-contact":
        return "Add New Contact";
      default:
        break;
    }
  };
  return (
    <header className="bg-stone-900 p-4">
      <div className="flex justify-center">
        <label className="text-white text-lg font-medium hover:text-blue-600">
          {renderLabel()}
        </label>
      </div>
    </header>
  );
};

export default Header;
