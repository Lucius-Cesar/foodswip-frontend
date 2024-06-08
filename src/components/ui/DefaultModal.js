import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/20/solid"

export default function DefaultModal({
  children,
  open,
  setOpen,
  xButton = false,
  closeOnOverlayClick = true,
}) {
  const handleClose = () => {
    setOpen(false)
  }

  const handCloseClickOnOverlay = () => {
    if (closeOnOverlayClick) {
      handleClose()
    }
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="relative z-10"
        onClose={handCloseClickOnOverlay}
        closeOnOverlayClick={false}
      >
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
              <Dialog.Panel className="relative transform h-fit m-auto rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {xButton && (
                  <button
                    type="button"
                    className={`absolute right-0 top-2 right-2 rounded-md text-gray-400 hover:text-gray-500`}
                    onClick={() => handleClose()}
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                  </button>
                )}

                <div className="flex flex-col justify-center items-center space-y-6">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
