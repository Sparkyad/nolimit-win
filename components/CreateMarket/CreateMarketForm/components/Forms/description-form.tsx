import { MarketFormData } from "../../View/create-market-view";
import { Pen } from "lucide-react";

export const DescriptionForm = ({
  data,
  setData,
}: {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
}) => {
  // console.log(data.rules);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-neutral-300 font-medium tracking-wider">
        Description
      </span>

      <span className="relative max-w-96">
        <textarea
          value={data.rules}
          onChange={(e) => setData({ ...data, rules: e.target.value })}
          className="
            border w-full rounded-xl border-neutral-800 custom-scrollbar
            outline-none pt-2 px-2 pb-10
            bg-[#262626]
            inset-shadow-neutral-500
            placeholder:text-neutral-600
          "
        />

        {/* <button
          type="button"
          className="
              absolute right-3 top-5 -translate-y-1/2
              rounded-md p-1
              text-neutral-600
              cursor-pointer
            "
        >
          <Pen size={18} />
        </button> */}
      </span>
    </div>
  );
};
