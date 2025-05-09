import { PlusIcon } from "@heroicons/react/20/solid";

export default function AddBtn({ onClick, className }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className} rounded-full outline outline-primary p-1 text-primary shadow-sm h-fit w-fit`}
    >
      <PlusIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
