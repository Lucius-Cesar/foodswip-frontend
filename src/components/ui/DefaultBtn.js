export default function DefaultBtn({ value, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} py-1 px-4 w-fit text-white rounded-s-full rounded-e-full text-center`}
    >
      {value}
    </button>
  );
}
