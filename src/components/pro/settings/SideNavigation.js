export default function SideNavigation({
  categoriesData,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <>
      <div className="sticky top-0 pb-8 lg:pt-0 lg:pb-2 w-full lg:w-fit bg-white lg:bg-none">
        <div className="sticky top-0 flex flex-row  justify-center h-fit items-start  px-4 py-4 bg-magnolia border border-1 border-gravel rounded-lg lg:space-y-2">
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
                  "border-e border-gravel lg:border-none"
                } ${
                  category === activeCategory
                    ? "text-primary font-bold"
                    : "text-dark-grey font-medium"
                } text-lg lg:text-xl`}
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
