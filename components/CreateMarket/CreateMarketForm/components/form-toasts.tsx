import toast from "react-hot-toast";
import { Check, X } from "lucide-react";

const baseToast =
  "toast-enter flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md border text-start text-balance";

export const showSuccessToast = (message: string) => {
  toast.custom(
    (t) => (
      <div
        className={`
          ${baseToast}
          bg-gradient-to-r from-[#1e1b3a] to-[#2d2768]
          border-emerald-500/20
          text-purple-100
        `}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
          <Check className="text-emerald-400" size={16} />
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    ),
    {
      duration: 3500,
    }
  );
};

export const showErrorToast = (message: string) => {
  toast.custom(
    (t) => (
      <div
        className={`
          ${baseToast}
          bg-[#0f0e1a]
          border-emerald-500/25
          text-purple-200
        `}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
          <X className="text-emerald-400" size={16} />
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    ),
    {
      duration: 3500,
    }
  );
};

export const showBigSuccessToast = (message: string) => {
  toast.custom(
    (t) => (
      <div
        className={`
          toast-enter
          flex items-center gap-4
          px-6 py-5
          rounded-2xl
          shadow-2xl
          backdrop-blur-lg
          border
          text-start
          max-w-md
          bg-gradient-to-r from-[#1e1b3a] to-[#2d2768]
          border-emerald-500/30
          text-purple-100
        `}
      >
        {/* Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/25">
          <Check className="text-purple-300" size={22} />
        </div>

        {/* Text */}
        <div className="flex flex-col">
          {/* <span className="text-base font-semibold">Transaction Confirmed</span> */}
          <span className="text-sm text-purple-200 mt-0.5">{message}</span>
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );
};
