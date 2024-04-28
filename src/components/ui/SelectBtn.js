import { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
export default function SelectBtn({
  children,
  onClick,
  status,
  validationError,
}) {
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        className={`p-4 h-20 w-fit flex flex-row justify-center gap-6 items-center bg-magnolia rounded-2xl border ${
          validationError ? "border-error-danger" : "border-gray-300"
        }  shadow-sm sm:hover:brightness-95`}
      >
        {children}
        {status === "fail" || validationError ? (
          <ExclamationCircleIcon className="h-6 w-6 text-error-danger" />
        ) : (
          <CheckCircleIcon className="h-6 w-6 text-success" />
        )}
      </button>
      {validationError && (
        <p className="mt-2 text-sm text-error-danger">{validationError}</p>
      )}
    </div>
  );
}
