"use client";
import DefaultBtn from "@/components/ui/DefaultBtn";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { formatTimeStringAfterMidnightForDisplay } from "@/utils/dateAndTime";
export default function PeriodItem({
  start,
  end,
  otherValue = null,
  closeBtn = false,
  onClickMainBtn = null,
  onClickCloseBtn = null,
  className,
}) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <DefaultBtn
          value={otherValue ? otherValue : `${start} - ${end}`}
          className={`${className} text-xl bg-primary hover:opacity-90  focus:text-white text-white self-center`}
          onClick={() => onClickMainBtn()}
        />
        {closeBtn && (
          <button
            onClick={() => onClickCloseBtn()}
            className="absolute right--1 top-0 bottom-0 m-auto"
          >
            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-dark-grey" />
          </button>
        )}
      </div>
    </div>
  );
}
