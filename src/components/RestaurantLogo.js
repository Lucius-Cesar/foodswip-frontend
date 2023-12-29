export default function RestaurantLogo({ path }) {
  return (
    <div className="h-14 w-56 sm:h-24 sm:w-72">
      <img
        className="h-full w-full object-contain"
        src={path}
        alt="Restaurant Logo"
      />
    </div>
  );
}
