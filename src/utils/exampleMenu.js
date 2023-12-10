const exampleMenu = [
    {
      value: "Pizza",
      foods: [
        {
          value: "Pizza Margherita",
          description: ["Sauce tomate", "Mozzarella", "Basilic"],
          price: 10.99
        },
        {
          value: "Pizza Pepperoni",
          description: ["Sauce tomate", "Mozzarella", "Pepperoni", "Poivrons"],
          price: 11.99
        },
        {
          value: "Pizza Végétarienne",
          description: ["Sauce tomate", "Mozzarella", "Champignons", "Poivrons", "Oignons", "Olives"],
          price: 11.49
        },
        {
          value: "Pizza Hawaiienne",
          description: ["Sauce tomate", "Mozzarella", "Jambon", "Ananas"],
          price: 12.49
        },
        {
          value: "Pizza Quatre Fromages",
          description: ["Mozzarella", "Gorgonzola", "Parmesan", "Emmental"],
          price: 12.99
        },
        {
          value: "Pizza Frutti di Mare",
          description: ["Sauce tomate", "Fruits de mer", "Ail", "Persil"],
          price: 13.99
        },
        {
          value: "Calzone",
          description: ["Sauce tomate", "Mozzarella", "Jambon", "Champignons"],
          price: 12.99
        },
        {
          value: "Pizza BBQ",
          description: ["Sauce barbecue", "Poulet grillé", "Poivrons", "Oignons", "Mozzarella"],
          price: 13.49
        },
        {
          value: "Pizza Mexicaine",
          description: ["Sauce tomate", "Poulet épicé", "Poivrons", "Oignons", "Maïs", "Coriandre"],
          price: 13.99
        },
        {
          value: "Pizza Capricciosa",
          description: ["Sauce tomate", "Jambon", "Artichauts", "Champignons", "Olives", "Mozzarella"],
          price: 14.49
        }
      ]
    },
    {
      value: "Pâtes",
      foods: [
        {
          value: "Spaghetti Bolognese",
          description: ["Sauce bolognaise", "Boeuf haché", "Tomates", "Oignons", "Ail"],
          price: 9.99
        },
        {
          value: "Fettuccine Alfredo",
          description: ["Sauce Alfredo", "Poulet grillé", "Parmesan", "Persil"],
          price: 11.99
        },
        {
          value: "Penne Arrabiata",
          description: ["Sauce tomate épicée", "Ail", "Persil"],
          price: 10.49
        },
        {
          value: "Lasagnes",
          description: ["Sauce bolognaise", "Béchamel", "Fromage", "Pâtes"],
          price: 12.49
        },
        {
          value: "Raviolis aux épinards et ricotta",
          description: ["Sauce tomate", "Épinards", "Ricotta", "Parmesan"],
          price: 11.99
        },
        {
          value: "Pâtes Carbonara",
          description: ["Sauce carbonara", "Lardons", "Oeuf", "Parmesan"],
          price: 10.99
        },
        {
          value: "Gnocchi à la sauce pesto",
          description: ["Sauce pesto", "Gnocchi", "Parmesan", "Basilic"],
          price: 10.99
        },
        {
          value: "Tagliatelles aux fruits de mer",
          description: ["Fruits de mer", "Sauce à l'ail", "Persil"],
          price: 13.49
        },
        {
          value: "Rigatoni à la Béchamel",
          description: ["Sauce béchamel", "Jambon", "Champignons", "Fromage"],
          price: 11.49
        },
        {
          value: "Pâtes Primavera",
          description: ["Légumes grillés", "Sauce à l'ail", "Parmesan"],
          price: 10.99
        }
      ]
    },
        {
          value: "Entrées",
          foods: [
            {
              value: "Bruschetta",
              description: ["Tomates", "Ail", "Basilic", "Pain grillé"],
              price: 6.99
            },
            {
              value: "Calamars frits",
              description: ["Calamars", "Chapelure", "Sauce tartare"],
              price: 8.99
            },
            {
              value: "Ailes de poulet épicées",
              description: ["Ailes de poulet", "Sauce piquante", "Carottes", "Céleri"],
              price: 9.99
            },
            {
              value: "Salade César",
              description: ["Laitue romaine", "Poulet grillé", "Parmesan", "Croûtons", "Sauce César"],
              price: 7.99
            },
            {
              value: "Mozzarella sticks",
              description: ["Bâtonnets de mozzarella", "Panure", "Sauce marinara"],
              price: 6.99
            },
            {
              value: "Salade de tomates et mozzarella",
              description: ["Tomates", "Mozzarella", "Basilic", "Vinaigrette balsamique"],
              price: 8.49
            },
            {
              value: "Assiette de fromages",
              description: ["Sélection de fromages", "Fruits secs", "Pain"],
              price: 10.99
            },
            {
              value: "Soupe à l'oignon gratinée",
              description: ["Soupe à l'oignon", "Croûton", "Fromage fondu"],
              price: 6.49
            },
            {
              value: "Salade printanière",
              description: ["Laitue", "Fraises", "Noix", "Vinaigrette au miel"],
              price: 8.99
            },
            {
              value: "Champignons farcis",
              description: ["Champignons", "Fromage", "Herbes", "Ail"],
              price: 7.49
            }
          ]
        },
        {
          value: "Desserts",
          foods: [
            {
              value: "Tiramisu",
              description: ["Biscuits à la cuillère", "Café", "Mascarpone", "Cacao"],
              price: 7.99
            },
            {
              value: "Fondant au chocolat",
              description: ["Chocolat noir", "Beurre", "Oeufs", "Sucre", "Farine"],
              price: 8.99
            },
            {
              value: "Panna Cotta",
              description: ["Crème", "Sucre", "Gélatine", "Vanille"],
              price: 6.49
            },
            {
              value: "Crumble aux fruits",
              description: ["Fruits de saison", "Sucre", "Beurre", "Farine", "Avoine"],
              price: 7.49
            },
            {
              value: "Profiteroles",
              description: ["Choux", "Glace à la vanille", "Chocolat chaud"],
              price: 8.49
            },
            {
              value: "Tarte aux fruits",
              description: ["Pâte brisée", "Fruits frais", "Gelée de fruit"],
              price: 9.99
            },
            {
              value: "Mousse au citron",
              description: ["Citron", "Crème", "Sucre", "Gélatine"],
              price: 6.99
            },
            {
              value: "Crêpes au Nutella",
              description: ["Crêpes", "Nutella", "Banane", "Noix"],
              price: 7.99
            },
            {
              value: "Salade de fruits frais",
              description: ["Fruits de saison", "Miel", "Menthe"],
              price: 5.99
            },
            {
              value: "Gâteau au fromage",
              description: ["Fromage frais", "Oeufs", "Sucre", "Vanille"],
              price: 9.49
            }
          ]
        },
        {
            value: "Boissons",
            foods: [
              {
                value: "Eau minérale",
                description: ["Eau"],
                price: 2.49
              },
              {
                value: "Soda cola",
                description: ["Soda", "Cola"],
                price: 3.99
              },
              {
                value: "Jus d'orange frais",
                description: ["Jus d'orange pressé"],
                price: 4.49
              },
              {
                value: "Café noir",
                description: ["Café"],
                price: 2.99
              },
              {
                value: "Thé glacé",
                description: ["Thé", "Glaçons", "Citron"],
                price: 3.49
              },
              {
                value: "Smoothie aux fruits rouges",
                description: ["Fruits rouges", "Yaourt", "Miel"],
                price: 5.99
              },
              {
                value: "Mojito sans alcool",
                description: ["Menthe", "Citron vert", "Sucre de canne", "Eau gazeuse"],
                price: 4.99
              },
              {
                value: "Limonade maison",
                description: ["Citron", "Eau gazeuse", "Sucre"],
                price: 3.79
              },
              {
                value: "Cappuccino",
                description: ["Café", "Lait", "Mousse de lait"],
                price: 4.29
              },
              {
                value: "Vin rouge",
                description: ["Vin rouge", "Cépages assortis"],
                price: 8.99
              }
            ]
          }
        
    ]

export default exampleMenu;
