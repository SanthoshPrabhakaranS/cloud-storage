import React from "react";

const AsideFooter = () => {
  return (
    <div className="flex flex-col justify-center items-center px-3 py-6 bg-blue-100 rounded-lg">
      <h1 className="text-xl mb-1 font-semibold">Need More Space?</h1>
      <p className="text-sm font-medium text-gray-600">
        Get more space by upgrading the plan
      </p>
      <button className="p-3 mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
        Upgrade Plan
      </button>
    </div>
  );
};

export default AsideFooter;
