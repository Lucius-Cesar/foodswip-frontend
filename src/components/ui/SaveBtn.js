import LoadingSpinner from "./LoadingSpinner"; // Importez votre composant LoadingSpinner ici
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function SaveBtn({
  value,
  onClick,
  color,
  className,
  isLoading,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className={`${color ? `bg-${color}` : ""} ${className} ${
          isLoading ? "invisible" : ""
        } bg-success inline-flex gap-x-2 rounded-lg px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:opacity-90`}
        onClick={onClick}
      >
        {value ? value : "Sauvegarder"}
        <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner
            className={color ? `text-${color}` : "text-success"}
          />
        </div>
      )}
    </div>
  );
}
