import LoadingSpinner from "./LoadingSpinner";
import { CheckIcon } from "@heroicons/react/20/solid";

const FullWidthBtn = ({ children, isLoading, success, className, onClick }) => {
  return (
    <>
      <div className="h-14">
        <button
          className={`${className} flex flex-row justify-center items-center fixed bottom-0 w-full h-14 bg-success sm:hover:brightness-110 text-white font-bold text-xl`}
          disabled={isLoading || success}
          id="submit"
          onClick={onClick}
        >
          {isLoading ? (
            <LoadingSpinner className="text-white" />
          ) : success ? (
            <CheckIcon className="text-white text-center h-10 w-10" />
          ) : (
            children
          )}
        </button>
      </div>
    </>
  );
};

export default FullWidthBtn;
