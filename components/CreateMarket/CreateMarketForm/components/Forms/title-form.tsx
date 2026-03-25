import { MarketFormData } from "../../View/create-market-view";
import { Pen } from "lucide-react";

export const TitleForm = ({
  data,
  setData,
}: {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-neutral-300 font-medium tracking-wider">
        Question
      </span>

      <span className="relative max-w-96">
        <input
          type="text"
          value={data.question}
          onChange={(e) => setData({ ...data, question: e.target.value })}
          className="
            border w-full rounded-xl border-neutral-800
            outline-none py-2 px-2
            bg-[#262626]
            inset-shadow-neutral-500
            placeholder:text-neutral-600
          "
        />

        {/* {!data.question && (
          <button
            type="button"
            className="
          absolute right-3 top-1/2 -translate-y-1/2
          rounded-md p-1
          text-neutral-600
          cursor-pointer
          "
          >
            <Pen size={18} />
          </button>
        )} */}
      </span>
    </div>
  );
};
