"use client";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

export default function InputNumber({
  id,
  placeholder,
  textSize = "sm",
  value,
  onChange,
  onIncrement,
  onDecrement,
  validationFunction = null,
  validationError = null,
}) {
  return (
    <div className="w-fit">
      <div className="w-full">
        <div className="w-full flex flex-row gap-1">
          <input
            type={"number"}
            name={id}
            id={id}
            value={value}
            placeholder={placeholder}
            className={`${
              validationError ? "ring-error-danger" : "ring-gray-300"
            }
            w-full text-center rounded-xl border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-${textSize} sm:leading-8`}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) =>
              validationFunction && validationFunction(e.target.value)
            }
          />
          {onIncrement && onDecrement && (
            <div className="flex flex-col">
              <button className="" onClick={() => onIncrement()}>
                <ChevronUpIcon
                  className="h-6 w-6 text-gray-400 hover:text-dark-grey"
                  aria-hidden="true"
                />
              </button>
              <button className="" onClick={() => onDecrement()}>
                <ChevronDownIcon
                  className="h-6 w-6 text-gray-400 hover:text-dark-grey"
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
          {validationError && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
      {validationError && (
        <p className={`mt-2 text-${textSize} text-error-danger`}>
          {validationError}
        </p>
      )}
    </div>
  );
}
