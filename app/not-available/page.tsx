import Image from "next/image";
import React from "react";

function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center text-center gap-4 max-w-md px-6">
        <Image src="/Logo/logo-2.png" width={64} height={64} alt="NoLimit" />
        <h2 className="text-2xl font-semibold text-white tracking-wide">
          NoLimit
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed text-balance">
          NoLimit is currently not available to users accessing from the United
          States.
        </p>
      </div>
    </div>
  );
}

export default Page;
