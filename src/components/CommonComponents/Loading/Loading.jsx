import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex gap-3 items-center justify-center">
      <div className="h-4 w-4 bg-[#A899D9] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-[#A899D9] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-[#A899D9] rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingSpinner;