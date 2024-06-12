import React from "react";

const Button = ({ onClick, loading, text }) => {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        disabled={loading}
        className="disabled:bg-gray-300 w-full font-semibold bg-accent text-white bg-pink hover:text-pink hover:bg-light-pink transition py-2 text-sm sm:text-base rounded"
      >
        {loading ? "Loading ..." : text}
      </button>
    </div>
  );
};

export default Button;