import React from "react";

const Button = ({ onClick, loading, text }) => {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        disabled={loading}
        className="disabled:bg-gray-300 w-full font-semibold bg-blue text-white hover:bg-[#ff46f998] transition py-2 text-sm sm:text-base rounded"
      >
        {loading ? "Loading ..." : text}
      </button>
    </div>
  );
};

export default Button;