import OrderCard from "@/components/pro/order-manager/OrderCard";
import { BellAlertIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import OrderNotifications from "@/components/pro/order-manager/OrderNotifications";
const page = () => {
  const restaurant = {
    name: "Dodopizza",
    address: {
      street: "Avenue des dodos 7130 Binche",
      postCode: 7134,
      city: "Binche",
    },
  };

  let orders = {};
  orders.data = [
    {
      _id: {
        $oid: "6681ab6205923e6eff8ac303",
      },
      orderNumber: 233564,
      customer: {
        firstname: "Lucien",
        lastname: "Delgrange",
        mail: "luciendelgrange@gmail.com",
        phoneNumber: "0499887766",
        address: {
          street: "Rue du test",
          streetNumber: "8",
          postCode: "7100",
          city: "laLouv",
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
            {
              value: "Poulet grillé",
              price: 1.25,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51442bab015bccf1841",
              },
            },
            {
              value: "Anchois",
              price: 1,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51442bab015bccf183e",
              },
            },
            {
              value: "Jambon italien",
              price: 1,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51442bab015bccf183b",
              },
            },
          ],
          quantity: 4,
          price: 14.24,
          sum: 56.96,
        },
      ],
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
                {
                  value: "Poulet grillé",
                  price: 1.25,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51442bab015bccf1841",
                  },
                },
                {
                  value: "Anchois",
                  price: 1,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51442bab015bccf183e",
                  },
                },
                {
                  value: "Jambon italien",
                  price: 1,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51442bab015bccf183b",
                  },
                },
              ],
              quantity: 4,
              price: 14.24,
              sum: 56.96,
            },
          ],
        },
      ],
      articlesSum: 56.96,
      deliveryFees: 2.5,
      totalSum: 59.46,
      note: "",
      orderType: 0,
      paymentMethod: "cash",
      creationDate: "2024-06-30T19:00:50.557Z",

      lastUpdate: "2024-06-30T19:00:50.557Z",

      estimatedArrivalDate: "2024-06-30T20:00:50.528Z",

      status: "accepted",
      statusHistory: [
        {
          status: "new",
          date: {
            $date: "2024-06-30T19:00:50.557Z",
          },
        },
        {
          status: "accepted",
          date: {
            $date: "2024-06-30T19:00:59.538Z",
          },
        },
      ],
      restaurant: {
        $oid: "66145f2db84fa2b61c6acb85",
      },
      slug: "dodopizza",
      __v: 1,
    },
    {
      _id: {
        $oid: "667e7b0e42208940bdd5af2e",
      },
      orderNumber: 233534,
      customer: {
        firstname: "luce",
        lastname: "grangius",
        mail: "luce@test.com",
        phoneNumber: "0498089362",
        address: {
          street: "test",
          streetNumber: "8",
          postCode: "7100",
          city: "tst",
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
            {
              value: "Anchois",
              price: 1,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51442bab015bccf183e",
              },
            },
            {
              value: "Poulet grillé",
              price: 1.25,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51442bab015bccf1841",
              },
            },
          ],
          quantity: 4,
          price: 13.24,
          sum: 52.96,
        },
      ],
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
                {
                  value: "Anchois",
                  price: 1,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51442bab015bccf183e",
                  },
                },
                {
                  value: "Poulet grillé",
                  price: 1.25,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51442bab015bccf1841",
                  },
                },
              ],
              quantity: 4,
              price: 13.24,
              sum: 52.96,
            },
          ],
        },
      ],
      articlesSum: 52.96,
      totalSum: 52.96,
      note: "",
      orderType: 1,
      paymentMethod: "cash",
      creationDate: {
        $date: "2024-06-28T08:57:50.077Z",
      },
      lastUpdate: {
        $date: "2024-06-28T08:57:50.077Z",
      },
      estimatedArrivalDate: "2024-06-28T20:15:00.000Z",
      status: "accepted",
      statusHistory: [
        {
          status: "new",
          date: {
            $date: "2024-06-28T08:57:50.077Z",
          },
        },
        {
          status: "accepted",
          date: {
            $date: "2024-06-28T10:28:03.778Z",
          },
        },
      ],
      restaurant: {
        $oid: "66145f2db84fa2b61c6acb85",
      },
      slug: "dodopizza",
      __v: 1,
    },
    {
      _id: {
        $oid: "667ef283c1ce490be2f5cf85",
      },
      orderNumber: 233543,
      customer: {
        firstname: "test",
        lastname: "trest",
        mail: "test@test.resr",
        phoneNumber: "088776655",
        address: {
          street: "Rue test",
          streetNumber: "8",
          postCode: "7100",
          city: "La louv",
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
            {
              value: "Poulet grillé",
              price: 1.25,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51442bab015bccf1841",
              },
            },
            {
              value: "Anchois",
              price: 1,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51442bab015bccf183e",
              },
            },
          ],
          quantity: 4,
          price: 13.24,
          sum: 52.96,
        },
      ],
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
                {
                  value: "Poulet grillé",
                  price: 1.25,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51442bab015bccf1841",
                  },
                },
                {
                  value: "Anchois",
                  price: 1,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51442bab015bccf183e",
                  },
                },
              ],
              quantity: 4,
              price: 13.24,
              sum: 52.96,
            },
          ],
        },
      ],
      articlesSum: 52.96,
      deliveryFees: 2.5,
      totalSum: 55.46,
      note: "",
      orderType: 0,
      paymentMethod: "cash",
      creationDate: "2024-06-28T17:27:31.496Z",
      lastUpdate: {
        $date: "2024-06-28T17:27:31.496Z",
      },
      estimatedArrivalDate: "2024-06-28T21:00:00.000Z",

      status: "new",
      statusHistory: [
        {
          status: "new",
          date: {
            $date: "2024-06-28T17:27:31.496Z",
          },
        },
        {
          status: "accepted",
          date: {
            $date: "2024-06-28T17:27:59.132Z",
          },
        },
      ],
      restaurant: {
        $oid: "66145f2db84fa2b61c6acb85",
      },
      slug: "dodopizza",
      __v: 1,
    },
    {
      _id: {
        $oid: "66807e80379576da1eeba710",
      },
      orderNumber: 233552,
      customer: {
        firstname: "luce",
        lastname: "grangius",
        mail: "luce@grangius.com",
        phoneNumber: "0498089372",
        address: {
          street: "testtest",
          streetNumber: "10101",
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
            {
              value: "Anchois",
              price: 1,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51442bab015bccf183e",
              },
            },
            {
              value: "Champignons tranchés",
              price: 0.75,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1835",
              },
            },
            {
              value: "Olives noires",
              price: 0.5,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51342bab015bccf1832",
              },
            },
          ],
          quantity: 5,
          price: 13.24,
          sum: 66.2,
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
          quantity: 1,
          price: 8.99,
          sum: 8.99,
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
        {
          food: {
            value: "Panna Cotta",
            description: "Crème, Sucre, Gélatine, Vanille",
            price: 6.49,
            display: true,
            categoryNumber: 3,
            categoryTitle: "Desserts",
            tva: 6,
            _id: {
              $oid: "6637e52842bab015bccf193e",
            },
          },
          options: [],
          quantity: 1,
          price: 6.49,
          sum: 6.49,
        },
      ],
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
                {
                  value: "Anchois",
                  price: 1,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51442bab015bccf183e",
                  },
                },
                {
                  value: "Champignons tranchés",
                  price: 0.75,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1835",
                  },
                },
                {
                  value: "Olives noires",
                  price: 0.5,
                  isSupplement: true,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "6637e51342bab015bccf1832",
                  },
                },
              ],
              quantity: 5,
              price: 13.24,
              sum: 66.2,
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
              quantity: 1,
              price: 8.99,
              sum: 8.99,
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
            {
              food: {
                value: "Panna Cotta",
                description: "Crème, Sucre, Gélatine, Vanille",
                price: 6.49,
                display: true,
                categoryNumber: 3,
                categoryTitle: "Desserts",
                tva: 6,
                _id: {
                  $oid: "6637e52842bab015bccf193e",
                },
              },
              options: [],
              quantity: 1,
              price: 6.49,
              sum: 6.49,
            },
          ],
        },
      ],
      articlesSum: 89.67,
      deliveryFees: 2.5,
      totalSum: 92.17,
      note: "i",
      orderType: 0,
      paymentMethod: "cash",
      creationDate: "2024-06-29T21:37:04.114Z",

      lastUpdate: {
        $date: "2024-06-29T21:37:04.114Z",
      },
      estimatedArrivalDate: "2024-06-29T22:37:04.095Z",

      status: "new",
      statusHistory: [
        {
          status: "new",
          date: {
            $date: "2024-06-29T21:37:04.114Z",
          },
        },
        {
          status: "accepted",
          date: {
            $date: "2024-06-29T21:38:11.120Z",
          },
        },
      ],
      restaurant: {
        $oid: "66145f2db84fa2b61c6acb85",
      },
      slug: "dodopizza",
      __v: 1,
    },
  ];

  const newOrders = orders.data?.filter((order) => order.status === "new");
  const acceptedOrders = orders.data?.filter(
    (order) => order.status === "accepted"
  );

  return (
    <>
      <OrderNotifications></OrderNotifications>
      <div className="max-w-screen-sm">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row gap-1">
            <BellAlertIcon className="text-yellow-400 h-6" />
            <p className="text-lg font-extrabold">
              Nouveau ({newOrders?.length || 0})
            </p>
          </div>
          <div className="space-y-2">
            {newOrders?.map((order, i) => (
              <OrderCard key={i} order={order} />
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex flex-row gap-1">
            <CheckCircleIcon className="text-success h-6" />
            <p className="text-lg font-extrabold">
              Accepté ({acceptedOrders?.length || 0})
            </p>
          </div>
          <div className="space-y-2">
            {acceptedOrders?.map((order, i) => (
              <OrderCard key={i} order={order} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
