"use client";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
export default function FormInputLogin({
  label,
  labelSize = "base",
  textSize = "sm",
  type = "text",
  placeholder,
  id,
  name,
  autoComplete,
  value,
  onChange,
  validationFunction = null,
  validationError = null,
}) {
  return (
    <div className="w-full h-full">
      <div className="h-full">
        {label && (
          <label
            htmlFor={id}
            className={`ml-px block text-${labelSize} text-white font-normal mb-2`}
          >
            {label}
          </label>
        )}
        <div className="relative h-fit">
          <input
            type={type}
            name={name ? name : id}
            id={id}
            value={value}
            placeholder={placeholder}
            className={`${validationError ? "ring-gray-900" : "ring-gray-300"} 
            block w-full rounded-xl border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 text-${textSize}`}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) =>
              validationFunction && validationFunction(e.target.value)
            }
            autoComplete={autoComplete}
          />
          {validationError && (
            <div className="pointer-events-none absolute top-2.5 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-gray-900"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {validationError && (
          <p className={`mt-2 text-${textSize} font-medium text-gray-900`}>
            {validationError}
          </p>
        )}
      </div>
    </div>
  );
}
