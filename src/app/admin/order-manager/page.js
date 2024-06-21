import OrderCard from "@/components/admin/order-manager/OrderCard";
import { BellAlertIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
const page = () => {
  const restaurant = {
    name: "Dodopizza",
    address: {
      street: "Avenue des dodos 7130 Binche",
      postCode: 7134,
      city: "Binche",
    },
  };

  const orders = [
    {
      _id: {
        $oid: "66741749f8cf387099dc4ecf",
      },
      orderNumber: 233485,
      customer: {
        firstname: "Lucien",
        lastname: "Delgrange",
        mail: "luciendelgrange5@gmail.com",
        phoneNumber: "0498089362",
        address: {
          street: "Rue du bout de la Haut",
          streetNumber: "8",
          postCode: "7390",
          city: "Quaregnon",
        },
        ip: "::1",
      },
      articles: [
        {
          food: {
            value: "Pizza Margherita",
            description: "Sauce tomate, Mozzarella, Basilic",
            price: 10.99,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51442bab015bccf1843",
            },
          },
          options: [
            {
              value: "Taille S",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51242bab015bccf181d",
              },
            },
            {
              value: "Croûte normale",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1826",
              },
            },
          ],
          quantity: 1,
          price: 10.99,
          sum: 10.99,
        },
        {
          food: {
            value: "Pizza Pepperoni",
            description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
            price: 11.99,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51542bab015bccf1852",
            },
          },
          options: [
            {
              value: "Taille S",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51242bab015bccf181d",
              },
            },
            {
              value: "Croûte normale",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1826",
              },
            },
          ],
          quantity: 1,
          price: 11.99,
          sum: 11.99,
        },
        {
          food: {
            value: "Fettuccine Alfredo",
            description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
            price: 11.99,
            display: true,
            categoryNumber: 1,
            categoryTitle: "Pâtes",
            tva: 6,
            _id: {
              $oid: "6637e52042bab015bccf18e6",
            },
          },
          options: [
            {
              value: "Pâtes blanches",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51f42bab015bccf18cd",
              },
            },
          ],
          quantity: 1,
          price: 11.99,
          sum: 11.99,
        },
        {
          food: {
            value: "Bruschetta",
            description: "Tomates, Ail, Basilic, Pain grillé",
            price: 6.99,
            display: true,
            categoryNumber: 2,
            categoryTitle: "Entrées",
            tva: 6,
            _id: {
              $oid: "6637e52642bab015bccf1928",
            },
          },
          options: [],
          quantity: 2,
          price: 6.99,
          sum: 13.98,
        },
        {
          food: {
            value: "Fondant au chocolat",
            description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
            price: 8.99,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf193c",
            },
          },
          options: [],
          quantity: 3,
          price: 8.99,
          sum: 26.97,
        },
        {
          food: {
            value: "Tiramisu",
            description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
            price: 7.99,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf193a",
            },
          },
          options: [],
          quantity: 1,
          price: 7.99,
          sum: 7.99,
        },
      ],
      articlesSum: 83.91,
      deliveryFees: 2.5,
      totalSum: 86.41,
      note: "",
      orderType: 0,
      paymentMethod: "online",
      creationDate: "2024-06-20T11:49:28.976Z",
      lastUpdate: {
        $date: "2024-06-20T11:49:28.976Z",
      },
      transactionFees: {
        platformCommission: 0,
        onlinePayment: 1.86,
        total: 1.86,
      },
      estimatedArrivalDate: "2024-06-20T17:00:00.000Z",
      status: "paymentPending",
      statusHistory: [
        {
          status: "paymentPending",
          date: {
            $date: "2024-06-20T11:49:28.976Z",
          },
        },
      ],
      restaurant: {
        $oid: "66145f2db84fa2b61c6acb85",
      },
      slug: "dodopizza",
      restaurantInfo: {
        name: "Dodopizza",
        phoneNumber: "+3288997766",
        address: {
          street: "Rue des Dodos",
          streetNumber: "5",
          postCode: "1000",
          city: "Bruxelles",
        },
        website: "www.dodopizza.com",
        privateSettings: {
          orderMailReception: {
            enabled: true,
            mail: "dodopizza.order@gmail.com",
          },
        },
      },
      formattedArticlesList: [
        {
          categoryTitle: "Pizza",
          categoryNumber: 0,
          articles: [
            {
              food: {
                value: "Pizza Margherita",
                description: "Sauce tomate, Mozzarella, Basilic",
                price: 10.99,
                display: true,
                categoryNumber: 0,
                categoryTitle: "Pizza",
                tva: 6,
                _id: {
                  $oid: "6637e51442bab015bccf1843",
                },
              },
              options: [
                {
                  value: "Taille S",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51242bab015bccf181d",
                  },
                },
                {
                  value: "Croûte normale",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1826",
                  },
                },
              ],
              quantity: 1,
              price: 10.99,
              sum: 10.99,
            },
            {
              food: {
                value: "Pizza Pepperoni",
                description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
                price: 11.99,
                display: true,
                categoryNumber: 0,
                categoryTitle: "Pizza",
                tva: 6,
                _id: {
                  $oid: "6637e51542bab015bccf1852",
                },
              },
              options: [
                {
                  value: "Taille S",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51242bab015bccf181d",
                  },
                },
                {
                  value: "Croûte normale",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1826",
                  },
                },
              ],
              quantity: 1,
              price: 11.99,
              sum: 11.99,
            },
          ],
        },
        {
          categoryTitle: "Pâtes",
          categoryNumber: 1,
          articles: [
            {
              food: {
                value: "Fettuccine Alfredo",
                description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
                price: 11.99,
                display: true,
                categoryNumber: 1,
                categoryTitle: "Pâtes",
                tva: 6,
                _id: {
                  $oid: "6637e52042bab015bccf18e6",
                },
              },
              options: [
                {
                  value: "Pâtes blanches",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51f42bab015bccf18cd",
                  },
                },
              ],
              quantity: 1,
              price: 11.99,
              sum: 11.99,
            },
          ],
        },
        {
          categoryTitle: "Entrées",
          categoryNumber: 2,
          articles: [
            {
              food: {
                value: "Bruschetta",
                description: "Tomates, Ail, Basilic, Pain grillé",
                price: 6.99,
                display: true,
                categoryNumber: 2,
                categoryTitle: "Entrées",
                tva: 6,
                _id: {
                  $oid: "6637e52642bab015bccf1928",
                },
              },
              options: [],
              quantity: 2,
              price: 6.99,
              sum: 13.98,
            },
          ],
        },
        {
          categoryTitle: "Desserts",
          categoryNumber: 3,
          articles: [
            {
              food: {
                value: "Fondant au chocolat",
                description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
                price: 8.99,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52742bab015bccf193c",
                },
              },
              options: [],
              quantity: 3,
              price: 8.99,
              sum: 26.97,
            },
            {
              food: {
                value: "Tiramisu",
                description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
                price: 7.99,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52742bab015bccf193a",
                },
              },
              options: [],
              quantity: 1,
              price: 7.99,
              sum: 7.99,
            },
          ],
        },
      ],
      note: "Pas de salade svp je déteste les légumes",
      paymentIntentId: "pi_3PTjUbP4PUdMZVTS0AEvYHyk",
      __v: 0,
    },
    {
      _id: {
        $oid: "66741749f8cf387099dc4ecf",
      },
      orderNumber: 233485,
      customer: {
        firstname: "Lucien",
        lastname: "Delgrange",
        mail: "luciendelgrange5@gmail.com",
        phoneNumber: "0498089362",
        address: {
          street: "Rue du bout de la Haut",
          streetNumber: "8",
          postCode: "7390",
          city: "Quaregnon",
        },
        ip: "::1",
      },
      articles: [
        {
          food: {
            value: "Pizza Margherita",
            description: "Sauce tomate, Mozzarella, Basilic",
            price: 10.99,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51442bab015bccf1843",
            },
          },
          options: [
            {
              value: "Taille S",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51242bab015bccf181d",
              },
            },
            {
              value: "Croûte normale",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1826",
              },
            },
          ],
          quantity: 1,
          price: 10.99,
          sum: 10.99,
        },
        {
          food: {
            value: "Pizza Pepperoni",
            description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
            price: 11.99,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51542bab015bccf1852",
            },
          },
          options: [
            {
              value: "Taille S",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51242bab015bccf181d",
              },
            },
            {
              value: "Croûte normale",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1826",
              },
            },
          ],
          quantity: 1,
          price: 11.99,
          sum: 11.99,
        },
        {
          food: {
            value: "Fettuccine Alfredo",
            description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
            price: 11.99,
            display: true,
            categoryNumber: 1,
            categoryTitle: "Pâtes",
            tva: 6,
            _id: {
              $oid: "6637e52042bab015bccf18e6",
            },
          },
          options: [
            {
              value: "Pâtes blanches",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51f42bab015bccf18cd",
              },
            },
          ],
          quantity: 1,
          price: 11.99,
          sum: 11.99,
        },
        {
          food: {
            value: "Bruschetta",
            description: "Tomates, Ail, Basilic, Pain grillé",
            price: 6.99,
            display: true,
            categoryNumber: 2,
            categoryTitle: "Entrées",
            tva: 6,
            _id: {
              $oid: "6637e52642bab015bccf1928",
            },
          },
          options: [],
          quantity: 2,
          price: 6.99,
          sum: 13.98,
        },
        {
          food: {
            value: "Fondant au chocolat",
            description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
            price: 8.99,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf193c",
            },
          },
          options: [],
          quantity: 3,
          price: 8.99,
          sum: 26.97,
        },
        {
          food: {
            value: "Tiramisu",
            description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
            price: 7.99,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf193a",
            },
          },
          options: [],
          quantity: 1,
          price: 7.99,
          sum: 7.99,
        },
      ],
      articlesSum: 83.91,
      deliveryFees: 2.5,
      totalSum: 86.41,
      note: "",
      orderType: 0,
      paymentMethod: "online",
      creationDate: "2024-06-20T11:49:28.976Z",
      lastUpdate: {
        $date: "2024-06-20T11:49:28.976Z",
      },
      transactionFees: {
        platformCommission: 0,
        onlinePayment: 1.86,
        total: 1.86,
      },
      estimatedArrivalDate: "2024-06-20T17:00:00.000Z",
      status: "paymentPending",
      statusHistory: [
        {
          status: "paymentPending",
          date: {
            $date: "2024-06-20T11:49:28.976Z",
          },
        },
      ],
      restaurant: {
        $oid: "66145f2db84fa2b61c6acb85",
      },
      slug: "dodopizza",
      restaurantInfo: {
        name: "Dodopizza",
        phoneNumber: "+3288997766",
        address: {
          street: "Rue des Dodos",
          streetNumber: "5",
          postCode: "1000",
          city: "Bruxelles",
        },
        website: "www.dodopizza.com",
        privateSettings: {
          orderMailReception: {
            enabled: true,
            mail: "dodopizza.order@gmail.com",
          },
        },
      },
      formattedArticlesList: [
        {
          categoryTitle: "Pizza",
          categoryNumber: 0,
          articles: [
            {
              food: {
                value: "Pizza Margherita",
                description: "Sauce tomate, Mozzarella, Basilic",
                price: 10.99,
                display: true,
                categoryNumber: 0,
                categoryTitle: "Pizza",
                tva: 6,
                _id: {
                  $oid: "6637e51442bab015bccf1843",
                },
              },
              options: [
                {
                  value: "Taille S",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51242bab015bccf181d",
                  },
                },
                {
                  value: "Croûte normale",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1826",
                  },
                },
              ],
              quantity: 1,
              price: 10.99,
              sum: 10.99,
            },
            {
              food: {
                value: "Pizza Pepperoni",
                description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
                price: 11.99,
                display: true,
                categoryNumber: 0,
                categoryTitle: "Pizza",
                tva: 6,
                _id: {
                  $oid: "6637e51542bab015bccf1852",
                },
              },
              options: [
                {
                  value: "Taille S",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51242bab015bccf181d",
                  },
                },
                {
                  value: "Croûte normale",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1826",
                  },
                },
              ],
              quantity: 1,
              price: 11.99,
              sum: 11.99,
            },
          ],
        },
        {
          categoryTitle: "Pâtes",
          categoryNumber: 1,
          articles: [
            {
              food: {
                value: "Fettuccine Alfredo",
                description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
                price: 11.99,
                display: true,
                categoryNumber: 1,
                categoryTitle: "Pâtes",
                tva: 6,
                _id: {
                  $oid: "6637e52042bab015bccf18e6",
                },
              },
              options: [
                {
                  value: "Pâtes blanches",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51f42bab015bccf18cd",
                  },
                },
              ],
              quantity: 1,
              price: 11.99,
              sum: 11.99,
            },
          ],
        },
        {
          categoryTitle: "Entrées",
          categoryNumber: 2,
          articles: [
            {
              food: {
                value: "Bruschetta",
                description: "Tomates, Ail, Basilic, Pain grillé",
                price: 6.99,
                display: true,
                categoryNumber: 2,
                categoryTitle: "Entrées",
                tva: 6,
                _id: {
                  $oid: "6637e52642bab015bccf1928",
                },
              },
              options: [],
              quantity: 2,
              price: 6.99,
              sum: 13.98,
            },
          ],
        },
        {
          categoryTitle: "Desserts",
          categoryNumber: 3,
          articles: [
            {
              food: {
                value: "Fondant au chocolat",
                description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
                price: 8.99,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52742bab015bccf193c",
                },
              },
              options: [],
              quantity: 3,
              price: 8.99,
              sum: 26.97,
            },
            {
              food: {
                value: "Tiramisu",
                description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
                price: 7.99,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52742bab015bccf193a",
                },
              },
              options: [],
              quantity: 1,
              price: 7.99,
              sum: 7.99,
            },
          ],
        },
      ],
      note: "Pas de salade svp je déteste les légumes",
      paymentIntentId: "pi_3PTjUbP4PUdMZVTS0AEvYHyk",
      __v: 0,
    },
    {
      _id: {
        $oid: "66741749f8cf387099dc4ecf",
      },
      orderNumber: 233485,
      customer: {
        firstname: "Lucien",
        lastname: "Delgrange",
        mail: "luciendelgrange5@gmail.com",
        phoneNumber: "0498089362",
        address: {
          street: "Rue du bout de la Haut",
          streetNumber: "8",
          postCode: "7390",
          city: "Quaregnon",
        },
        ip: "::1",
      },
      articles: [
        {
          food: {
            value: "Pizza Margherita",
            description: "Sauce tomate, Mozzarella, Basilic",
            price: 10.99,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51442bab015bccf1843",
            },
          },
          options: [
            {
              value: "Taille S",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51242bab015bccf181d",
              },
            },
            {
              value: "Croûte normale",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1826",
              },
            },
          ],
          quantity: 1,
          price: 10.99,
          sum: 10.99,
        },
        {
          food: {
            value: "Pizza Pepperoni",
            description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
            price: 11.99,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51542bab015bccf1852",
            },
          },
          options: [
            {
              value: "Taille S",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51242bab015bccf181d",
              },
            },
            {
              value: "Croûte normale",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1826",
              },
            },
          ],
          quantity: 1,
          price: 11.99,
          sum: 11.99,
        },
        {
          food: {
            value: "Fettuccine Alfredo",
            description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
            price: 11.99,
            display: true,
            categoryNumber: 1,
            categoryTitle: "Pâtes",
            tva: 6,
            _id: {
              $oid: "6637e52042bab015bccf18e6",
            },
          },
          options: [
            {
              value: "Pâtes blanches",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51f42bab015bccf18cd",
              },
            },
          ],
          quantity: 1,
          price: 11.99,
          sum: 11.99,
        },
        {
          food: {
            value: "Bruschetta",
            description: "Tomates, Ail, Basilic, Pain grillé",
            price: 6.99,
            display: true,
            categoryNumber: 2,
            categoryTitle: "Entrées",
            tva: 6,
            _id: {
              $oid: "6637e52642bab015bccf1928",
            },
          },
          options: [],
          quantity: 2,
          price: 6.99,
          sum: 13.98,
        },
        {
          food: {
            value: "Fondant au chocolat",
            description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
            price: 8.99,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf193c",
            },
          },
          options: [],
          quantity: 3,
          price: 8.99,
          sum: 26.97,
        },
        {
          food: {
            value: "Tiramisu",
            description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
            price: 7.99,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf193a",
            },
          },
          options: [],
          quantity: 1,
          price: 7.99,
          sum: 7.99,
        },
      ],
      articlesSum: 83.91,
      deliveryFees: 2.5,
      totalSum: 86.41,
      note: "",
      orderType: 0,
      paymentMethod: "online",
      creationDate: "2024-06-20T11:49:28.976Z",
      lastUpdate: {
        $date: "2024-06-20T11:49:28.976Z",
      },
      transactionFees: {
        platformCommission: 0,
        onlinePayment: 1.86,
        total: 1.86,
      },
      estimatedArrivalDate: "2024-06-20T17:00:00.000Z",
      status: "paymentPending",
      statusHistory: [
        {
          status: "paymentPending",
          date: {
            $date: "2024-06-20T11:49:28.976Z",
          },
        },
      ],
      restaurant: {
        $oid: "66145f2db84fa2b61c6acb85",
      },
      slug: "dodopizza",
      restaurantInfo: {
        name: "Dodopizza",
        phoneNumber: "+3288997766",
        address: {
          street: "Rue des Dodos",
          streetNumber: "5",
          postCode: "1000",
          city: "Bruxelles",
        },
        website: "www.dodopizza.com",
        privateSettings: {
          orderMailReception: {
            enabled: true,
            mail: "dodopizza.order@gmail.com",
          },
        },
      },
      formattedArticlesList: [
        {
          categoryTitle: "Pizza",
          categoryNumber: 0,
          articles: [
            {
              food: {
                value: "Pizza Margherita",
                description: "Sauce tomate, Mozzarella, Basilic",
                price: 10.99,
                display: true,
                categoryNumber: 0,
                categoryTitle: "Pizza",
                tva: 6,
                _id: {
                  $oid: "6637e51442bab015bccf1843",
                },
              },
              options: [
                {
                  value: "Taille S",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51242bab015bccf181d",
                  },
                },
                {
                  value: "Croûte normale",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1826",
                  },
                },
              ],
              quantity: 1,
              price: 10.99,
              sum: 10.99,
            },
            {
              food: {
                value: "Pizza Pepperoni",
                description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
                price: 11.99,
                display: true,
                categoryNumber: 0,
                categoryTitle: "Pizza",
                tva: 6,
                _id: {
                  $oid: "6637e51542bab015bccf1852",
                },
              },
              options: [
                {
                  value: "Taille S",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51242bab015bccf181d",
                  },
                },
                {
                  value: "Croûte normale",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1826",
                  },
                },
              ],
              quantity: 1,
              price: 11.99,
              sum: 11.99,
            },
          ],
        },
        {
          categoryTitle: "Pâtes",
          categoryNumber: 1,
          articles: [
            {
              food: {
                value: "Fettuccine Alfredo",
                description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
                price: 11.99,
                display: true,
                categoryNumber: 1,
                categoryTitle: "Pâtes",
                tva: 6,
                _id: {
                  $oid: "6637e52042bab015bccf18e6",
                },
              },
              options: [
                {
                  value: "Pâtes blanches",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51f42bab015bccf18cd",
                  },
                },
              ],
              quantity: 1,
              price: 11.99,
              sum: 11.99,
            },
          ],
        },
        {
          categoryTitle: "Entrées",
          categoryNumber: 2,
          articles: [
            {
              food: {
                value: "Bruschetta",
                description: "Tomates, Ail, Basilic, Pain grillé",
                price: 6.99,
                display: true,
                categoryNumber: 2,
                categoryTitle: "Entrées",
                tva: 6,
                _id: {
                  $oid: "6637e52642bab015bccf1928",
                },
              },
              options: [],
              quantity: 2,
              price: 6.99,
              sum: 13.98,
            },
          ],
        },
        {
          categoryTitle: "Desserts",
          categoryNumber: 3,
          articles: [
            {
              food: {
                value: "Fondant au chocolat",
                description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
                price: 8.99,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52742bab015bccf193c",
                },
              },
              options: [],
              quantity: 3,
              price: 8.99,
              sum: 26.97,
            },
            {
              food: {
                value: "Tiramisu",
                description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
                price: 7.99,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52742bab015bccf193a",
                },
              },
              options: [],
              quantity: 1,
              price: 7.99,
              sum: 7.99,
            },
          ],
        },
      ],
      note: "Pas de salade svp je déteste les légumes",
      paymentIntentId: "pi_3PTjUbP4PUdMZVTS0AEvYHyk",
      __v: 0,
    },
    {
      _id: {
        $oid: "66741749f8cf387099dc4ecf",
      },
      orderNumber: 233485,
      customer: {
        firstname: "Lucien",
        lastname: "Delgrange",
        mail: "luciendelgrange5@gmail.com",
        phoneNumber: "0498089362",
        address: {
          street: "Rue du bout de la Haut",
          streetNumber: "8",
          postCode: "7390",
          city: "Quaregnon",
        },
        ip: "::1",
      },
      articles: [
        {
          food: {
            value: "Pizza Margherita",
            description: "Sauce tomate, Mozzarella, Basilic",
            price: 10.99,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51442bab015bccf1843",
            },
          },
          options: [
            {
              value: "Taille S",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51242bab015bccf181d",
              },
            },
            {
              value: "Croûte normale",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1826",
              },
            },
          ],
          quantity: 1,
          price: 10.99,
          sum: 10.99,
        },
        {
          food: {
            value: "Pizza Pepperoni",
            description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
            price: 11.99,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51542bab015bccf1852",
            },
          },
          options: [
            {
              value: "Taille S",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51242bab015bccf181d",
              },
            },
            {
              value: "Croûte normale",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1826",
              },
            },
          ],
          quantity: 1,
          price: 11.99,
          sum: 11.99,
        },
        {
          food: {
            value: "Fettuccine Alfredo",
            description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
            price: 11.99,
            display: true,
            categoryNumber: 1,
            categoryTitle: "Pâtes",
            tva: 6,
            _id: {
              $oid: "6637e52042bab015bccf18e6",
            },
          },
          options: [
            {
              value: "Pâtes blanches",
              price: 0,
              isSupplement: false,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51f42bab015bccf18cd",
              },
            },
          ],
          quantity: 1,
          price: 11.99,
          sum: 11.99,
        },
        {
          food: {
            value: "Bruschetta",
            description: "Tomates, Ail, Basilic, Pain grillé",
            price: 6.99,
            display: true,
            categoryNumber: 2,
            categoryTitle: "Entrées",
            tva: 6,
            _id: {
              $oid: "6637e52642bab015bccf1928",
            },
          },
          options: [],
          quantity: 2,
          price: 6.99,
          sum: 13.98,
        },
        {
          food: {
            value: "Fondant au chocolat",
            description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
            price: 8.99,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf193c",
            },
          },
          options: [],
          quantity: 3,
          price: 8.99,
          sum: 26.97,
        },
        {
          food: {
            value: "Tiramisu",
            description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
            price: 7.99,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf193a",
            },
          },
          options: [],
          quantity: 1,
          price: 7.99,
          sum: 7.99,
        },
      ],
      articlesSum: 83.91,
      deliveryFees: 2.5,
      totalSum: 86.41,
      note: "",
      orderType: 0,
      paymentMethod: "online",
      creationDate: "2024-06-20T11:49:28.976Z",
      lastUpdate: {
        $date: "2024-06-20T11:49:28.976Z",
      },
      transactionFees: {
        platformCommission: 0,
        onlinePayment: 1.86,
        total: 1.86,
      },
      estimatedArrivalDate: "2024-06-20T17:00:00.000Z",
      status: "paymentPending",
      statusHistory: [
        {
          status: "paymentPending",
          date: {
            $date: "2024-06-20T11:49:28.976Z",
          },
        },
      ],
      restaurant: {
        $oid: "66145f2db84fa2b61c6acb85",
      },
      slug: "dodopizza",
      restaurantInfo: {
        name: "Dodopizza",
        phoneNumber: "+3288997766",
        address: {
          street: "Rue des Dodos",
          streetNumber: "5",
          postCode: "1000",
          city: "Bruxelles",
        },
        website: "www.dodopizza.com",
        privateSettings: {
          orderMailReception: {
            enabled: true,
            mail: "dodopizza.order@gmail.com",
          },
        },
      },
      formattedArticlesList: [
        {
          categoryTitle: "Pizza",
          categoryNumber: 0,
          articles: [
            {
              food: {
                value: "Pizza Margherita",
                description: "Sauce tomate, Mozzarella, Basilic",
                price: 10.99,
                display: true,
                categoryNumber: 0,
                categoryTitle: "Pizza",
                tva: 6,
                _id: {
                  $oid: "6637e51442bab015bccf1843",
                },
              },
              options: [
                {
                  value: "Taille S",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51242bab015bccf181d",
                  },
                },
                {
                  value: "Croûte normale",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1826",
                  },
                },
              ],
              quantity: 1,
              price: 10.99,
              sum: 10.99,
            },
            {
              food: {
                value: "Pizza Pepperoni",
                description: "Sauce tomate, Mozzarella Pepperoni, Poivrons",
                price: 11.99,
                display: true,
                categoryNumber: 0,
                categoryTitle: "Pizza",
                tva: 6,
                _id: {
                  $oid: "6637e51542bab015bccf1852",
                },
              },
              options: [
                {
                  value: "Taille S",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51242bab015bccf181d",
                  },
                },
                {
                  value: "Croûte normale",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1826",
                  },
                },
              ],
              quantity: 1,
              price: 11.99,
              sum: 11.99,
            },
          ],
        },
        {
          categoryTitle: "Pâtes",
          categoryNumber: 1,
          articles: [
            {
              food: {
                value: "Fettuccine Alfredo",
                description: "Sauce Alfredo, Poulet grillé, Parmesan; Persil",
                price: 11.99,
                display: true,
                categoryNumber: 1,
                categoryTitle: "Pâtes",
                tva: 6,
                _id: {
                  $oid: "6637e52042bab015bccf18e6",
                },
              },
              options: [
                {
                  value: "Pâtes blanches",
                  price: 0,
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51f42bab015bccf18cd",
                  },
                },
              ],
              quantity: 1,
              price: 11.99,
              sum: 11.99,
            },
          ],
        },
        {
          categoryTitle: "Entrées",
          categoryNumber: 2,
          articles: [
            {
              food: {
                value: "Bruschetta",
                description: "Tomates, Ail, Basilic, Pain grillé",
                price: 6.99,
                display: true,
                categoryNumber: 2,
                categoryTitle: "Entrées",
                tva: 6,
                _id: {
                  $oid: "6637e52642bab015bccf1928",
                },
              },
              options: [],
              quantity: 2,
              price: 6.99,
              sum: 13.98,
            },
          ],
        },
        {
          categoryTitle: "Desserts",
          categoryNumber: 3,
          articles: [
            {
              food: {
                value: "Fondant au chocolat",
                description: "Chocolat noir, Beurre, Oeufs, Sucre, Farine",
                price: 8.99,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52742bab015bccf193c",
                },
              },
              options: [],
              quantity: 3,
              price: 8.99,
              sum: 26.97,
            },
            {
              food: {
                value: "Tiramisu",
                description: "Biscuits à la cuillère, Café, Mascarpone, Cacao",
                price: 7.99,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52742bab015bccf193a",
                },
              },
              options: [],
              quantity: 1,
              price: 7.99,
              sum: 7.99,
            },
          ],
        },
      ],
      note: "Pas de salade svp je déteste les légumes",
      paymentIntentId: "pi_3PTjUbP4PUdMZVTS0AEvYHyk",
      __v: 0,
    },
  ];

  return (
    <>
      <div className="flex flex-col h-screen p-6 space-y-4">
        <div className="flex flex-col flex-grow space-y-4 overflow-y-hidden">
          <div className="flex flex-row gap-3">
            <BellAlertIcon className="text-yellow-400 h-8" />
            <p className="text-3xl font-bold">Nouveau (3)</p>
          </div>
          <div className=" overflow-y-auto space-y-4">
            <OrderCard order={orders[0]} />
            <OrderCard order={orders[0]} />
            <OrderCard order={orders[0]} />
            <OrderCard order={orders[0]} />
          </div>
        </div>

        <div className="flex flex-col flex-grow space-y-4 overflow-y-hidden">
          <div className="flex flex-row gap-3">
            <CheckCircleIcon className="text-success h-8" />
            <p className="text-3xl font-bold">Accepté (3)</p>
          </div>
          <div className="overflow-y-auto space-y-4">
            <OrderCard order={orders[0]} />
            <OrderCard order={orders[0]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
