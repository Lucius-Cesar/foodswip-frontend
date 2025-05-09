import { MinusIcon } from "@heroicons/react/20/solid";

export default function MinusBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="rounded-full outline outline-primary p-1 text-primary shadow-sm  h-fit w-fit"
    >
      <MinusIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
