import { useEffect } from "react";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

export function DefaultNotification({
  className,
  children,
  show,
  setShow,
  expirationTime,
}) {
  useEffect(() => {
    let timeoutId;
    if (!expirationTime) return;
    if (expirationTime) {
      timeoutId = setTimeout(() => {
        setShow(false);
      }, expirationTime);
    }
    return () => clearTimeout(timeoutId);
  }, [show]);
  return (
    <>
      <div
        className={`${className} z-40 flex w-full flex-col items-center space-y-4 sm:items-end`}
      >
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden shadow-md  rounded-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="ml-3 w-0 flex-1 pt-0.5">{children}</div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}
