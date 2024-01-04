"use client";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
export default function FormInput({
  label,
  placeholder,
  id,
  value,
  onChange,
  validationFunction,
  validationError,
}) {
  return (
    <div className>
      <div>
        <label
          htmlFor={id}
          className="ml-px block pl-4 text-md font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2 relative">
          <input
            type="text"
            name={id}
            id={id}
            value={value}
            placeholder={placeholder}
            className={`${
              validationError ? "ring-error-danger" : "ring-gray-300"
            } block w-full rounded-xl border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-8`}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => validationFunction(e.target.value)}
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
        <p className="mt-2 text-sm text-error-danger">{validationError}</p>
      )}
    </div>
  );
}
