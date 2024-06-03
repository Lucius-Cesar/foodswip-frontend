import LoadingSpinner from "./LoadingSpinner"
import { CheckIcon } from "@heroicons/react/20/solid"

const FullWidthBtn = ({ children, isLoading, success, className }) => {
  return (
    <>
      <div className="h-16"></div>
      <button
        className={`${className} flex flex-row justify-center items-center fixed bottom-0 w-full h-16 bg-success hover:opacity-90 text-white font-bold text-lg`}
        disabled={isLoading || success}
        id="submit"
      >
        {isLoading ? (
          <LoadingSpinner className="text-white" />
        ) : success ? (
          <CheckIcon className="text-white text-center h-10 w-10" />
        ) : (
          children
        )}
      </button>
    </>
  )
}

export default FullWidthBtn
