import React from "react";

const Loading = () => {
  return (
    <div class="flex-col gap-4 w-full flex items-center justify-center h-screen  bg-white">
      <div class="w-20 h-20 border-4 border-transparent text-black text-4xl animate-spin flex items-center justify-center border-t-black rounded-full">
        <div class="w-16 h-16 border-4 border-transparent text-primary text-2xl animate-spin flex items-center justify-center border-t-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;
