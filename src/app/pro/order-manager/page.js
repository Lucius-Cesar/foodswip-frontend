import OrderCard from "@/components/pro/order-manager/OrderCard";
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
        $oid: "667715ef8c9e32ab7109c45b",
      },
      orderNumber: 233489,
      customer: {
        firstname: "Phil",
        lastname: "Heath",
        mail: "Thebigphil@gmail.com",
        phoneNumber: "0497886655",
        address: {
          street: "Rue de la masse",
          streetNumber: "20",
          postCode: "7100",
          city: "Mutant City",
        },
        ip: "::1",
      },
      articles: [],
      formattedArticlesList: [
        {
          categoryTitle: "Pizza",
          categoryNumber: 0,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667715f08c9e32ab7109c463",
                },
              },
              options: [
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667715f08c9e32ab7109c464",
                  },
                },
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667715f08c9e32ab7109c465",
                  },
                },
              ],
              quantity: 4,
              price: 10.99,
              sum: 43.96,
            },
          ],
        },
      ],
      articlesSum: 43.96,
      deliveryFees: 2.5,
      totalSum: 46.46,
      note: "",
      orderType: 0,
      paymentMethod: "cash",
      creationDate: "2024-06-22T18:20:31.867Z",

      lastUpdate: {
        $date: "2024-06-22T18:20:31.867Z",
      },
      estimatedArrivalDate: "2024-06-22T19:20:31.814Z",

      status: "completed",
      statusHistory: [
        {
          status: "completed",
          date: {
            $date: "2024-06-22T18:20:31.867Z",
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
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "6677171f8c9e32ab7109c49a",
      },
      orderNumber: 233491,
      customer: {
        firstname: "Shawn",
        lastname: "Flexatron Rhoden",
        mail: "ThebigFlex@gmail.com",
        phoneNumber: "0495887766",
        address: {
          street: "Rue du stress chronique",
          streetNumber: "65",
          postCode: "7100",
          city: "Paix-a-son-âme",
        },
        ip: "::1",
      },
      articles: [
        {
          food: {
            value: "Pizza Hawaiienne",
            description: "Sauce tomate, Mozzarella, Jambon, Ananas",
            price: 12.49,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51742bab015bccf1870",
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
          price: 12.49,
          sum: 12.49,
        },
        {
          food: {
            value: "Raviolis aux épinards et ricotta",
            description: "Sauce tomate, Épinards, Ricotta, Parmesan",
            price: 11.99,
            display: true,
            categoryNumber: 1,
            categoryTitle: "Pâtes",
            tva: 6,
            _id: {
              $oid: "6637e52342bab015bccf18fe",
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
            {
              value: "Parmesan",
              price: 1,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51f42bab015bccf18d6",
              },
            },
            {
              value: "Tomates ceries",
              price: 1.5,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51f42bab015bccf18d9",
              },
            },
          ],
          quantity: 1,
          price: 14.49,
          sum: 14.49,
        },
        {
          food: {
            value: "Calamars frits",
            description: "Calamars, Chapelure, Sauce tartare",
            price: 8.99,
            display: true,
            categoryNumber: 2,
            categoryTitle: "Entrées",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf192a",
            },
          },
          options: [],
          quantity: 1,
          price: 8.99,
          sum: 8.99,
        },
        {
          food: {
            value: "Jus d'orange frais",
            description: "Jus d'orange pressé",
            price: 4.49,
            display: true,
            categoryNumber: 4,
            categoryTitle: "Boissons",
            tva: 6,
            _id: {
              $oid: "6637e52942bab015bccf1952",
            },
          },
          options: [],
          quantity: 1,
          price: 4.49,
          sum: 4.49,
        },
        {
          food: {
            value: "Soda cola",
            description: "Soda, Cola",
            price: 3.99,
            display: true,
            categoryNumber: 4,
            categoryTitle: "Boissons",
            tva: 6,
            _id: {
              $oid: "6637e52942bab015bccf1950",
            },
          },
          options: [],
          quantity: 1,
          price: 3.99,
          sum: 3.99,
        },
        {
          food: {
            value: "Eau minérale",
            description: "Eau",
            price: 1,
            display: true,
            categoryNumber: 4,
            categoryTitle: "Boissons",
            tva: 6,
            _id: {
              $oid: "6637e52942bab015bccf194e",
            },
          },
          options: [],
          quantity: 1,
          price: 1,
          sum: 1,
        },
      ],
      formattedArticlesList: [
        {
          categoryTitle: "Pizza",
          categoryNumber: 0,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667717208c9e32ab7109c4aa",
                },
              },
              options: [
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667717208c9e32ab7109c4ab",
                  },
                },
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667717208c9e32ab7109c4ac",
                  },
                },
              ],
              quantity: 1,
              price: 12.49,
              sum: 12.49,
            },
          ],
        },
        {
          categoryTitle: "Pâtes",
          categoryNumber: 1,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667717208c9e32ab7109c4ad",
                },
              },
              options: [
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667717208c9e32ab7109c4ae",
                  },
                },
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667717208c9e32ab7109c4af",
                  },
                },
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667717208c9e32ab7109c4b0",
                  },
                },
              ],
              quantity: 1,
              price: 14.49,
              sum: 14.49,
            },
          ],
        },
        {
          categoryTitle: "Entrées",
          categoryNumber: 2,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667717208c9e32ab7109c4b1",
                },
              },
              options: [],
              quantity: 1,
              price: 8.99,
              sum: 8.99,
            },
          ],
        },
        {
          categoryTitle: "Boissons",
          categoryNumber: 4,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667717208c9e32ab7109c4b2",
                },
              },
              options: [],
              quantity: 1,
              price: 4.49,
              sum: 4.49,
            },
            {
              food: {
                _id: {
                  $oid: "667717208c9e32ab7109c4b3",
                },
              },
              options: [],
              quantity: 1,
              price: 3.99,
              sum: 3.99,
            },
            {
              food: {
                _id: {
                  $oid: "667717208c9e32ab7109c4b4",
                },
              },
              options: [],
              quantity: 1,
              price: 1,
              sum: 1,
            },
          ],
        },
      ],
      articlesSum: 45.45,
      totalSum: 45.45,
      note: "",
      orderType: 1,
      paymentMethod: "cash",
      creationDate: "2024-06-22T18:25:35.877Z",
      lastUpdate: {
        $date: "2024-06-22T18:25:35.877Z",
      },
      estimatedArrivalDate: "2024-06-22T21:00:00.000Z",

      status: "completed",
      statusHistory: [
        {
          status: "completed",
          date: {
            $date: "2024-06-22T18:25:35.877Z",
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
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "6677168f8c9e32ab7109c47d",
      },
      orderNumber: 233490,
      customer: {
        firstname: "Ronnie",
        lastname: "Coleman",
        mail: "Thebigron@gmail.com",
        phoneNumber: "0499887766",
        address: {
          street: "Rue du DC",
          streetNumber: "65",
          postCode: "7100",
          city: "Lagrosseveine",
        },
        ip: "::1",
      },
      articles: [
        {
          food: {
            value: "Pizza Hawaiienne",
            description: "Sauce tomate, Mozzarella, Jambon, Ananas",
            price: 12.49,
            display: true,
            categoryNumber: 0,
            categoryTitle: "Pizza",
            tva: 6,
            _id: {
              $oid: "6637e51742bab015bccf1870",
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
          price: 12.49,
          sum: 12.49,
        },
        {
          food: {
            value: "Raviolis aux épinards et ricotta",
            description: "Sauce tomate, Épinards, Ricotta, Parmesan",
            price: 11.99,
            display: true,
            categoryNumber: 1,
            categoryTitle: "Pâtes",
            tva: 6,
            _id: {
              $oid: "6637e52342bab015bccf18fe",
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
            {
              value: "Parmesan",
              price: 1,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51f42bab015bccf18d6",
              },
            },
            {
              value: "Tomates ceries",
              price: 1.5,
              isSupplement: true,
              display: true,
              isNeededInOrder: true,
              _id: {
                $oid: "6637e51f42bab015bccf18d9",
              },
            },
          ],
          quantity: 1,
          price: 14.49,
          sum: 14.49,
        },
        {
          food: {
            value: "Calamars frits",
            description: "Calamars, Chapelure, Sauce tartare",
            price: 8.99,
            display: true,
            categoryNumber: 2,
            categoryTitle: "Entrées",
            tva: 6,
            _id: {
              $oid: "6637e52742bab015bccf192a",
            },
          },
          options: [],
          quantity: 1,
          price: 8.99,
          sum: 8.99,
        },
        {
          food: {
            value: "Jus d'orange frais",
            description: "Jus d'orange pressé",
            price: 4.49,
            display: true,
            categoryNumber: 4,
            categoryTitle: "Boissons",
            tva: 6,
            _id: {
              $oid: "6637e52942bab015bccf1952",
            },
          },
          options: [],
          quantity: 1,
          price: 4.49,
          sum: 4.49,
        },
        {
          food: {
            value: "Soda cola",
            description: "Soda, Cola",
            price: 3.99,
            display: true,
            categoryNumber: 4,
            categoryTitle: "Boissons",
            tva: 6,
            _id: {
              $oid: "6637e52942bab015bccf1950",
            },
          },
          options: [],
          quantity: 1,
          price: 3.99,
          sum: 3.99,
        },
        {
          food: {
            value: "Eau minérale",
            description: "Eau",
            price: 1,
            display: true,
            categoryNumber: 4,
            categoryTitle: "Boissons",
            tva: 6,
            _id: {
              $oid: "6637e52942bab015bccf194e",
            },
          },
          options: [],
          quantity: 1,
          price: 1,
          sum: 1,
        },
      ],
      formattedArticlesList: [
        {
          categoryTitle: "Pizza",
          categoryNumber: 0,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667716908c9e32ab7109c48d",
                },
              },
              options: [
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667716908c9e32ab7109c48e",
                  },
                },
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667716908c9e32ab7109c48f",
                  },
                },
              ],
              quantity: 1,
              price: 12.49,
              sum: 12.49,
            },
          ],
        },
        {
          categoryTitle: "Pâtes",
          categoryNumber: 1,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667716908c9e32ab7109c490",
                },
              },
              options: [
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667716908c9e32ab7109c491",
                  },
                },
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667716908c9e32ab7109c492",
                  },
                },
                {
                  isSupplement: false,
                  display: true,
                  isNeededInOrder: true,
                  _id: {
                    $oid: "667716908c9e32ab7109c493",
                  },
                },
              ],
              quantity: 1,
              price: 14.49,
              sum: 14.49,
            },
          ],
        },
        {
          categoryTitle: "Entrées",
          categoryNumber: 2,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667716908c9e32ab7109c494",
                },
              },
              options: [],
              quantity: 1,
              price: 8.99,
              sum: 8.99,
            },
          ],
        },
        {
          categoryTitle: "Boissons",
          categoryNumber: 4,
          articles: [
            {
              food: {
                _id: {
                  $oid: "667716908c9e32ab7109c495",
                },
              },
              options: [],
              quantity: 1,
              price: 4.49,
              sum: 4.49,
            },
            {
              food: {
                _id: {
                  $oid: "667716908c9e32ab7109c496",
                },
              },
              options: [],
              quantity: 1,
              price: 3.99,
              sum: 3.99,
            },
            {
              food: {
                _id: {
                  $oid: "667716908c9e32ab7109c497",
                },
              },
              options: [],
              quantity: 1,
              price: 1,
              sum: 1,
            },
          ],
        },
      ],
      articlesSum: 45.45,
      deliveryFees: 2.5,
      totalSum: 47.95,
      note: "",
      orderType: 0,
      paymentMethod: "online",
      creationDate: "2024-06-22T18:23:11.207Z",
      lastUpdate: {
        $date: "2024-06-22T18:23:11.207Z",
      },
      transactionFees: {
        platformCommission: 0,
        onlinePayment: 1.19,
        total: 1.19,
      },
      estimatedArrivalDate: "2024-06-22T19:23:11.195Z",
      status: "paymentPending",
      statusHistory: [
        {
          status: "paymentPending",
          date: {
            $date: "2024-06-22T18:23:11.207Z",
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
      },
      paymentIntentId: "pi_3PUYahP4PUdMZVTS17E831op",
      __v: 0,
    },
  ];
  //test

  return (
    <>
      <div className="flex flex-col h-screen p-4 space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row gap-1">
            <BellAlertIcon className="text-yellow-400 h-6" />
            <p className="text-lg font-extrabold">Nouveau (3)</p>
          </div>
          <div className="space-y-2">
            <OrderCard order={orders[0]} />
            <OrderCard order={orders[1]} />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex flex-row gap-1">
            <CheckCircleIcon className="text-success h-6" />
            <p className="text-lg font-extrabold">Accepté (3)</p>
          </div>
          <div className="space-y-2">
            <OrderCard order={orders[2]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
