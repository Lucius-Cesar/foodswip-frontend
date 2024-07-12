const MenuForFlyers = ({
  menu,
  categoriesToDelete,
  foodsToDelete,
  textSize,
  cols,
  textAlignment,
}) => {
  const textSizes = {
    title:
      textSize === "small"
        ? "text-3xl"
        : textSize === "medium"
        ? "text-4xl"
        : textSize === "large"
        ? "text-5xl"
        : textSize === "extra-large"
        ? "text-6xl"
        : null,
    food:
      textSize === "small"
        ? "text-lg"
        : textSize === "medium"
        ? "text-xl"
        : textSize === "large"
        ? "text-2xl"
        : textSize === "extra-large"
        ? "text-3xl"
        : null,
    description:
      textSize === "small"
        ? "text-normal"
        : textSize === "medium"
        ? "text-lg"
        : textSize === "large"
        ? "text-xl"
        : textSize === "extra-large"
        ? "text-2xl"
        : null,
  };

  const marginAfterTitle =
    textSize === "small"
      ? "mb-2"
      : textSize === "medium"
      ? "mb-3"
      : textSize === "large"
      ? "mb-6"
      : textSize === "extra-large"
      ? "mb-8"
      : null;

  categoriesToDelete = categoriesToDelete
    .split(";")
    .map((category) => category.toLowerCase());

  // Assuming foodsToDelete is a string of food items separated by semicolons
  foodsToDelete = foodsToDelete.split(";").map((food) => food.toLowerCase());

  menu = menu.filter((category) => {
    // Filter out categories that are in categoriesToDelete
    if (categoriesToDelete.includes(category.title.toLowerCase())) {
      return false;
    }

    // Further filter out individual foods within each category that are in foodsToDelete
    category.foods = category.foods.filter((food) => {
      return !foodsToDelete.includes(food.value.toLowerCase());
    });

    return true;
  });

  let menuColumns = Array.from({ length: cols }, () => []);
  let totalFoods = menu.reduce(
    (acc, category) => acc + category.foods.length,
    0
  );
  const idealFoodsPerCol = Math.ceil(totalFoods / cols);

  menu.forEach((category) => {
    // Trouver la colonne avec le moins de plats
    const columnIndex = menuColumns.reduce(
      (minIndex, currentCol, currentIndex, array) => {
        const currentColFoods = array[minIndex].reduce(
          (acc, cat) => acc + cat.foods.length,
          0
        );
        const newColFoods = currentCol.reduce(
          (acc, cat) => acc + cat.foods.length,
          0
        );
        return newColFoods < currentColFoods ? currentIndex : minIndex;
      },
      0
    );

    menuColumns[columnIndex].push(category);
  });

  return (
    <div
      className={`flex ${cols == 1 ? "flex-col" : ""} justify-between ${
        textAlignment === "center" ? "text-center" : ""
      } px-4 h-full w-full `}
    >
      {menuColumns.map((column, idx) => (
        <div key={idx} className={`w-1/${cols} px-2`}>
          {column.map((category) => (
            <div key={category.title} className="mb-8">
              <p
                className={`${textSizes.title} text-primary font-bold ${marginAfterTitle}`}
              >
                {category.title}
              </p>
              {category.foods.map((food) => (
                <div key={food.value} className="mb-4">
                  <p className={`${textSizes.food} font-semibold`}>
                    {food.value} - {food.price} €
                  </p>
                  <p className={`${textSizes.description}`}>
                    {food.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuForFlyers;
