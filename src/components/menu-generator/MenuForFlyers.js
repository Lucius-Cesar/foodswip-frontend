const MenuForFlyers = ({
  menu,
  categoriesToDelete,
  maxFoodPerCategory,
  disposition,
}) => {
  let menuColumns = [[], [], []];

  // Supprimer les catégories à supprimer
  categoriesToDelete = categoriesToDelete.split(";");
  menu = menu.filter(
    (category) =>
      !categoriesToDelete
        .map((item) => item.toLowerCase())
        .includes(category.title.toLowerCase())
  );

  if (maxFoodPerCategory) {
    menu = menu.map((category) => ({
      ...category,
      foods: category.foods.slice(0, maxFoodPerCategory),
    }));
  }
  if (disposition === "optimizeSpace") {
    const cols = 3;
    menuColumns = Array.from({ length: cols }, () => []);
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
  } else if (disposition === "symmetric") {
    const totalFoods = menu.reduce(
      (acc, category) => acc + category.foods.length,
      0
    );

    const cols = 3;
    // Calculer le nombre idéal de plats par colonne
    const idealFoodsPerCol = Math.ceil(totalFoods / cols);

    let currentColFoods = 0; // Compteur pour le nombre de plats dans la colonne actuelle

    // Répartir les catégories entre les colonnes
    menu.forEach((category) => {
      if (
        currentColFoods + category.foods.length > idealFoodsPerCol &&
        menuColumns[0].length > menuColumns[1].length
      ) {
        // Passer à la colonne suivante si l'ajout de cette catégorie dépasse le nombre idéal et la colonne actuelle n'est pas la dernière
        menuColumns[1].push(category);
        currentColFoods = category.foods.length;
      } else if (
        currentColFoods + category.foods.length > idealFoodsPerCol &&
        menuColumns[1].length > menuColumns[2].length
      ) {
        menuColumns[2].push(category);
        currentColFoods = category.foods.length;
      } else {
        // Ajouter la catégorie à la colonne actuelle
        menuColumns[0].push(category);
        currentColFoods += category.foods.length;
      }
    });
  }
  // Limiter le nombre de plats par catégorie si nécessaire

  if (disposition === "optimizeSpace") {
    return (
      <div className="flex justify-between px-4 h-full w-full">
        {menuColumns.map((column, idx) => (
          <div key={idx} className="w-1/3 px-2">
            {column.map((category) => (
              <div key={category.title} className="mb-8">
                <h1 className="text-primary font-bold mb-2">
                  {category.title}
                </h1>
                {category.foods.map((food) => (
                  <div key={food.value} className="mb-4">
                    <h4 className="text-md font-semibold">
                      {food.value} - {food.price} €
                    </h4>
                    <p className="text-sm">{food.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  } else if (disposition === "symmetric") {
    return (
      <div className="flex justify-between px-4 h-full w-full">
        {menuColumns.map((column, idx) => (
          <div key={idx} className="w-1/3 px-2">
            {column.map((category) => (
              <div key={category.title} className="mb-8">
                <h1 className="text-primary font-bold mb-2">
                  {category.title}
                </h1>
                {category.foods.map((food) => (
                  <div key={food.value} className="mb-4">
                    <h4 className="text-md font-semibold">
                      {food.value} - {food.price} €
                    </h4>
                    <p className="text-sm">{food.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
};

export default MenuForFlyers;
