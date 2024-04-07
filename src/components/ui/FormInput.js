"use client";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
export default function FormInput({
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
    <div className>
      <div>
        {label && (
          <label
            htmlFor={id}
            className={`ml-px block text-${labelSize} font-medium leading-6 mb-2`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            type={type}
            name={name ? name : id}
            id={id}
            value={value}
            placeholder={placeholder}
            className={`${
              validationError ? "ring-error-danger" : "ring-gray-300"
            } 
            block w-full rounded-xl border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-${textSize} sm:leading-8`}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) =>
              validationFunction && validationFunction(e.target.value)
            }
            autoComplete={autoComplete}
          />
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
