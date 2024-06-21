export default function SideNavigation({
  categoriesData,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <>
      <div className="sticky top-0 pb-8 sm:pt-0 sm:pb-2 w-full sm:w-fit bg-white sm:bg-none">
        <div className="sticky top-0 flex flex-row sm:flex-col justify-center sm:w-fit sm:whitespace-nowrap	h-fit items-start py-2 sm:px-4 sm:py-4 bg-magnolia border border-1 border-gravel rounded-lg sm:space-y-2">
          {categoriesData.map((category, i) => (
            <button
              type="button"
              onClick={() => {
                setActiveCategory(categoriesData[i]);
              }}
            >
              <p
                className={`  ${
                  i < categoriesData.length - 1 &&
                  "border-e border-gravel sm:border-none"
                } ${
                  category === activeCategory
                    ? "text-primary font-bold"
                    : "text-dark-grey font-medium"
                } text-lg sm:text-xl`}
              >
                {category}
              </p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
