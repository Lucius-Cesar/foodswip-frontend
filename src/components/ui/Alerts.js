import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export const SuccesAlert = ({
  message,
  className,
  open,
  setOpen,
  openTime,
}) => {
  let timeoutId;
  useEffect(() => {
    clearTimeout(timeoutId);
    if (openTime) {
      timeoutId = setTimeout(() => {
        onClose();
      }, openTime);

      return () => clearTimeout(timeoutId);
    }
  }, [open, openTime]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={`${className} ${!open && "hidden"} rounded-md bg-green-50 p-3`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-center font-medium text-green-800">
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              onClick={() => onClose()}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ErrorAlert = ({ message, className, open, setOpen, openTime }) => {
  let timeoutId;
  useEffect(() => {
    clearTimeout(timeoutId);
    if (openTime) {
      timeoutId = setTimeout(() => {
        onClose();
      }, openTime);

      return () => clearTimeout(timeoutId);
    }
  }, [open, openTime]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={`${className} ${!open && "hidden"} bg-red-50 p-3`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-center font-medium text-red-800">
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              onClick={() => onClose()}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WarningAlert = ({ children }) => {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">{children}</p>
        </div>
      </div>
    </div>
  );
};
