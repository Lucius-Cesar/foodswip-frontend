"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DefaultBtn from "@/components/ui/DefaultBtn";
import { modalPeriodValidation } from "@/utils/validations";
import {
  formatEndTimeStringIfAfterMidnightForDatabase,
  formatTimeStringAfterMidnightForDisplay,
} from "@/utils/dateAndTime";

export default function ModalPeriod({
  type,
  value,
  setValue,
  open,
  setOpen,
  startLabel,
  endLabel,
  validateBtnFunction,
  variant,
}) {
  const [validationErrors, setValidationErrors] = useState({
    period: "",
  });
  const handleClose = () => {
    setOpen(false);
    setTimeout(function () {
      setValue({
        dayIndex: null,
        itemIndex: null,
        start: null,
        end: null,
      });
      setValidationErrors({ period: "" });
    }, 300);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex h-full sm:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform h-fit m-auto overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex flex-col justify-center items-center space-y-6">
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <label
                      htmlFor={"timeStart"}
                      className={`ml-px text-xl block font-medium leading-6`}
                    >
                      {startLabel}
                    </label>
                    <input
                      type={type}
                      id={"end"}
                      value={value.start}
                      onChange={(e) =>
                        setValue((previous) => ({
                          ...previous,
                          start: e.target.value,
                        }))
                      }
                      className={`rounded-xl border border-1 border-gray-300 focus:border-primary shadow-sm placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:leading-8`}
                    ></input>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <label
                      htmlFor={"timeEnd"}
                      className={`ml-px text-xl block  font-medium leading-6`}
                    >
                      {endLabel}
                    </label>
                    <input
                      type={type}
                      id={"end"}
                      value={
                        value?.end && type === "time"
                          ? formatTimeStringAfterMidnightForDisplay(value?.end)
                          : value.end
                      }
                      onChange={(e) => {
                        setValue((previous) => ({
                          ...previous,
                          end: e.target.value,
                        }));
                      }}
                      className={`rounded-xl border border-1 border-gray-300 focus:border-primary shadow-sm placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:leading-8`}
                    ></input>
                  </div>
                  {variant === "service" ? (
                    <div className="flex flex-col justify-center items-start space-y-2">
                      <div className="flex flex-row gap-2">
                        <input
                          type="checkbox"
                          id="takeAwayCheckBox"
                          name="Livraison"
                          checked={value.delivery}
                          onChange={(e) => {
                            setValue((previous) => ({
                              ...previous,
                              delivery: e.target.checked,
                            }));
                          }}
                          className={`h-6 w-6  rounded border-gray-300 text-primary focus:ring-primary`}
                        />
                        <label htmlFor="takeAwayCheckBox" className="text-lg">
                          Livraison
                        </label>
                      </div>
                      <div className="flex flex-row gap-2">
                        <input
                          type="checkbox"
                          id="takeAwayCheckBox"
                          name="À emporter"
                          checked={value.takeaway}
                          onChange={(e) => {
                            setValue((previous) => ({
                              ...previous,
                              takeaway: e.target.checked,
                            }));
                          }}
                          className={`h-6 w-6  rounded border-gray-300 text-primary focus:ring-primary`}
                        />
                        <label htmlFor="takeAwayCheckBox" className="text-lg">
                          À emporter{" "}
                        </label>
                      </div>
                    </div>
                  ) : null}
                  <DefaultBtn
                    value="Valider"
                    className="text-xl font-bold bg-success hover:opacity-90"
                    onClick={() => {
                      modalPeriodValidation(
                        value,
                        setValidationErrors,
                        type,
                        "period",
                        variant
                      );
                      setValidationErrors((previous) => {
                        if (!previous.period) {
                          validateBtnFunction();
                          handleClose();
                        }
                        return previous;
                      });
                    }}
                  />
                  {validationErrors.period && (
                    <p className="text-error-danger text-center">
                      {validationErrors.period}{" "}
                    </p>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
