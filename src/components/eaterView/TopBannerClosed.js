import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
export default function TopBannerClosed({ onClick }) {
  return (
    <button
      className="w-full top-0 flex flex-row flex-grow justify-around gap-x-6 bg-primary px-6 py-2.5 sm:px-3.5"
      onClick={() => onClick()}
    >
      <p className="relative text-lg leading-6 text-white font-bold align-baseline">
        L'établissement est actuellement fermé
        <ExclamationTriangleIcon className="absolute h-6 w-6 text-white -left-8 top-0 bottom-0" />
      </p>
    </button>
  )
}
