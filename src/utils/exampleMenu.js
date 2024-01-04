const exampleMenu = [
  {
    value: "Pizza",
    foods: [
      {
        value: "Pizza Margherita",
        description: "Sauce tomate, Mozzarella, Basilic",
        price: 10.99,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },

          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 1,
        display: true,
      },
      {
        value: "Pizza Pepperoni",
        description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
        price: 11.99,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 2,
        display: true,
      },
      {
        value: "Pizza Végétarienne",
        description:
          "Sauce tomate Mozzarella Champignons Poivrons Oignons Olives",
        price: 11.49,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 3,
        display: true,
      },
      {
        value: "Pizza Hawaiienne",
        description: "Sauce tomate, Mozzarella, Jambon, Ananas",
        price: 12.49,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 4,
        display: true,
      },
      {
        value: "Pizza Quatre Fromages",
        description: "Mozzarella, Gorgonzola, parmesan, Emmental",
        price: 12.99,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 5, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Pizza Frutti di Mare",
        description: "Sauce tomate, Fruits de mer, Ail, Persil",
        price: 13.99,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 6, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Calzone",
        description: "Sauce tomate, Mozzarella, Jambon, Champignons",
        price: 12.99,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 7, // ajustez la position en conséquence
        display: true,
      },

      {
        value: "Pizza BBQ",
        description:
          "Sauce barbecue, Poulet grillé, Poivrons, Oignons, Mozzarella",
        price: 13.49,

        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 8, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Pizza Mexicaine",
        description:
          "Sauce tomate, Poulet épicé, Poivrons, Oignons, Maïs, Coriandre",
        price: 13.99,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 9, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Pizza Capricciosa",
        description:
          "Sauce tomate, Jambon, Artichauts, Champignons, Olives, Mozzarella",
        price: 14.49,
        options: [
          {
            categoryValue: "Choisis ta taille",
            items: [
              { value: "Taille S", price: 0 },
              { value: "Taille M", price: 1.5 },
              { value: "Taille XL", price: 3.0 },
            ],
          },
          {
            categoryValue: "Choisis ta croute",
            items: [
              { value: "Croûte normale", price: 0 },
              { value: "Croûte aux herbes", price: 1.0 },
              { value: "Croûte au fromage", price: 1.0 },
              { value: "Croûte sans gluten", price: 2.0 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Olives noires", price: 1.5 },
              { value: "Champignons", price: 2.0 },
            ],
          },
        ],
        position: 10, // ajustez la position en conséquence
        display: true,
      },
    ],
  },
  {
    value: "Pâtes",
    foods: [
      {
        value: "Spaghetti Bolognese",
        description: "Sauce bolognaise Boeuf haché, Tomates, Oignons, Ail",
        price: 9.99,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 1, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Fettuccine Alfredo",
        description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
        price: 11.99,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 2, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Penne Arrabiata",
        description: "Sauce tomate épicée, Ail, Persil",
        price: 10.49,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 3, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Lasagnes",
        description: "Sauce bolognaise, Béchamel, Fromage, Pâtes",
        price: 12.49,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 4, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Raviolis aux épinards et ricotta",
        description: "Sauce tomate, Épinards, Ricotta, Parmesan",
        price: 11.99,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 5, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Pâtes Carbonara",
        description: "Sauce carbonara, Lardons, Oeuf, Parmesan",
        price: 10.99,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 6, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Gnocchi à la sauce pesto",
        description: "Sauce pesto, Gnocchi, Parmesan, Basilic",
        price: 10.99,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 7, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Tagliatelles aux fruits de mer",
        description: "Fruits de mer, Sauce à l'ail, Persil",
        price: 13.49,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 8, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Rigatoni à la Béchamel",
        description: "Sauce béchamel, Jambon, Champignons, Fromage",
        price: 11.49,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 9, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Pâtes Primavera",
        description: "Légumes grillés, Sauce à l'ail, Parmesan",
        price: 10.99,
        options: [
          {
            categoryValue: "Choisis ton type de pâtes",
            items: [
              { value: "Pâtes blanches", price: 0 },
              { value: "Pâtes complètes", price: 0 },
              { value: "Pâtes sans gluten", price: 1.5 },
            ],
          },
        ],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 10, // ajustez la position en conséquence
        display: true,
      },
    ],
  },
  {
    value: "Entrées",
    foods: [
      {
        value: "Bruschetta",
        description: "Tomates, Ail, Basilic, Pain grillé",
        price: 6.99,
        options: [],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 1, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Calamars frits",
        description: "Calamars, Chapelure, Sauce tartare",
        price: 8.99,
        options: [],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 2, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Ailes de poulet épicées",
        description: "Ailes de poulet, Sauce piquante, Carottes, Céleri",
        price: 9.99,
        supplements: [
          { value: "Double portion de sauce piquante", price: 2.0 },
          { value: "Légumes supplémentaires", price: 1.5 },
        ],
        options: [
          {
            categoryValue: "Choisis ta portion",
            items: [
              { value: "Portion XL", price: 2 },
              { value: "Portion normale", price: 0 },
            ],
          },
        ],
        supplements: [],
        position: 3, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Salade César",
        description:
          "Laitue romaine, Poulet grillé, Parmesan, Croûtons, Sauce César",
        price: 7.99,
        options: [],
        supplements: [
          {
            categoryValue: "Choisis tes suppléments:",
            items: [
              { value: "Parmesan", price: 1 },
              { value: "Tomates ceries", price: 1.5 },
              { value: "Piments", price: 1 },
            ],
          },
        ],
        position: 4, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Mozzarella sticks",
        description: "Bâtonnets de mozzarella, Panure, Sauce marinara",
        price: 6.99,
        supplements: [],
        options: [],
        position: 5, // ajustez la position en conséquence
        display: true,
      },
      {
        value: "Soupe à l'oignon gratinée",
        description: "Soupe à l'oignon, Croûton, Fromage fondu",
        price: 6.49,
        supplements: [],
        options: [],
        position: 8, // ajustez la position en conséquence
        display: true,
      },
    ],
  },
  {
    value: "Desserts",
    foods: [
      {
        value: "Tiramisu",
        description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
        price: 7.99,
        options: [],
        supplements: [],
        position: 1,
      },
      {
        value: "Fondant au chocolat",
        description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
        price: 8.99,
        options: [],
        supplements: [],
        position: 2,
      },
      {
        value: "Panna Cotta",
        description: "Crème, Sucre, Gélatine, Vanille",
        price: 6.49,
        options: [],
        supplements: [],
        position: 3,
      },
      {
        value: "Crumble aux fruits",
        description: "Fruits de saison, Sucre, Beurre, Farine, Avoine",
        price: 7.49,
        options: [],
        supplements: [],
        position: 4,
      },
      {
        value: "Profiteroles",
        description: "Choux, Glace à la vanille, Chocolat chaud",
        price: 8.49,
        options: [],
        supplements: [],
        position: 5,
      },
      {
        value: "Tarte aux fruits",
        description: "Pâte brisée, Fruits frais, Gelée de fruit",
        price: 9.99,
        options: [],
        supplements: [],
        position: 6,
      },
      {
        value: "Mousse au citron",
        description: "Citron, Crème, Sucre, Gélatine",
        price: 6.99,
        options: [],
        supplements: [],
        position: 7,
      },
      {
        value: "Crêpes au Nutella",
        description: "Crêpes, Nutella, Banane, Noix",
        price: 7.99,
        options: [],
        supplements: [],
        position: 8,
      },
      {
        value: "Salade de fruits frais",
        description: "Fruits de saison, Miel, Menthe",
        price: 5.99,
        options: [],
        supplements: [],
        position: 9,
      },
      {
        value: "Gâteau au fromage",
        description: "Fromage frais, Oeufs, Sucre, Vanille",
        price: 9.49,
        options: [],
        supplements: [],
        position: 10,
      },
    ],
  },
  {
    value: "Boissons",
    foods: [
      {
        value: "Eau minérale",
        description: "Eau",
        price: 2.49,
        options: [],
        supplements: [],
        position: 1,
      },
      {
        value: "Soda cola",
        description: "Soda, Cola",
        price: 3.99,
        options: [],
        supplements: [],
        position: 2,
      },
      {
        value: "Jus d'orange frais",
        description: "Jus d'orange pressé",
        price: 4.49,
        options: [],
        supplements: [],
        position: 3,
      },
      {
        value: "Café noir",
        description: "Café",
        price: 2.99,
        options: [],
        supplements: [],
        position: 4,
      },
      {
        value: "Thé glacé",
        description: "Thé, Glaçons, Citron",
        price: 3.49,
        options: [],
        supplements: [],
        position: 5,
      },
      {
        value: "Smoothie aux fruits rouges",
        description: "Fruits rouges, Yaourt, Miel",
        price: 5.99,
        options: [],
        supplements: [],
        position: 6,
      },
      {
        value: "Mojito sans alcool",
        description: "Menthe, Citron vert, Sucre de canne, Eau gazeuse",
        price: 4.99,
        options: [],
        supplements: [],
        position: 7,
      },
      {
        value: "Limonade maison",
        description: "Citron, Eau gazeuse, Sucre",
        price: 3.79,
        options: [],
        supplements: [],
        position: 8,
      },
      {
        value: "Cappuccino",
        description: "Café, Lait, Mousse de lait",
        price: 4.29,
        options: [],
        supplements: [],
        position: 9,
      },
      {
        value: "Vin rouge",
        description: "Vin rouge, Cépages assortis",
        price: 8.99,
        options: [],
        supplements: [],
        position: 10,
      },
    ],
  },
];

export default exampleMenu;
