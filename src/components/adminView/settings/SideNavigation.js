export default function SideNavigation({
  categoriesData,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <>
      <div className="sticky top-0 flex flex-col justify-center w-32 sm:w-72 h-fit items-center px-4 py-4 bg-magnolia border border-1 border-gravel rounded-lg space-y-2">
        {categoriesData.map((category, i) => (
          <button
            type="button"
            onClick={() => {
              setActiveCategory(categoriesData[i]);
            }}
          >
            <p
              className={`${
                category.value === activeCategory.value
                  ? "text-primary font-bold"
                  : "text-dark-grey font-medium"
              } text-xl`}
            >
              {category.value}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}
