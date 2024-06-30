import LoadingSpinner from "./LoadingSpinner"; // Importez votre composant LoadingSpinner ici

export default function DefaultBtn({
  value,
  onClick,
  color,
  className,
  isLoading,
  type,
}) {
  return (
    <div className="relative inline-block">
      <button
        type={type ? type : "button"}
        onClick={onClick}
        className={`${className} ${color ? `bg-${color}` : ""} ${
          isLoading ? "invisible" : ""
        }
        py-1 px-4 font-bold rounded-s-full rounded-e-full text-center hover:opacity-90 text-white`}
        disabled={isLoading} // Désactiver le bouton lors du chargement
      >
        {value}
      </button>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner className={color ? `text-${color}` : ""} />
        </div>
      )}
    </div>
  );
}
