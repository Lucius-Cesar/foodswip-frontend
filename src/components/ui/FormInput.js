"use client";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
export default function FormInput({
  label,
  placeholder,
  id,
  onChange,
  additionnalError,
}) {
  const [isEmpty, setEmpty] = useState(false);
  const checkEmpty = (string) => {
    if (string === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          type="text"
          name={id}
          id={id}
          placeholder={placeholder}
          className={`${
            additionnalError || isEmpty ? "ring-error-danger" : "ring-gray-300"
          } block w-full rounded-xl border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6`}
          onChange={onChange}
          onBlur={(e) => checkEmpty(e.target.value)}
        />
        {isEmpty && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {isEmpty && (
        <p className="mt-2 text-sm text-error-danger">
          Veuillez remplir ce champ
        </p>
      )}
      {additionnalError && (
        <p className="mt-2 text-sm text-error-danger">{additionnalError}</p>
      )}
    </div>
  );
}
