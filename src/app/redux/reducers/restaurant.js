import { createSlice } from "@reduxjs/toolkit";
import exampleMenu from "@/utils/exampleMenu";

const initialState = {
  name: "Dodopizza",
  uniqueValue: "dodopizza",
  mail: "restaurant@dodopizza.com",
  website: "www.dodopizza.com",
  adress: {
    street: "Rue des Dodos",
    streetNumber: 1,
    postCode: 1000,
    city: "Bruxelles",
  },
  phoneNumber: "+32407886655",
  menu: exampleMenu,
  orderSettings: {
    orderTypes: [
      { value: 0, label: "Livraison", enabled: true },
      {
        value: 1,
        label: "À emporter",
        enabled: true,
      },
    ],
    pendingOrderAlert: {
      enabled: true,
      interval: 5,
    },
    deliveryEstimate: {
      min: 30,
      max: 60,
    },
    deliveryFees: 5,
    deliveryMin: 20,
    takeAwayEstimate: 15,
    paymentMethods: [
      {
        value: "Paypal",
        delivery: false,
        takeAway: false,
      },
      {
        value: "Espèces",
        delivery: true,
        takeAway: true,
      },
      {
        value: "Bancontact",
        delivery: false,
        takeAway: true,
      },
    ],
  },
  restaurantSettings: {
    schedulde: [
      {
        label: "Lundi",
        services: [
          {
            start: "09:00",
            end: "14:30",
          },
          {
            start: "18:00",
            end: "22:00",
          },
        ],
      },
      {
        label: "Mardi",
        services: [
          {
            start: "09:00",
            end: "14:30",
          },
          {
            start: "18:00",
            end: "22:00",
          },
        ],
      },
      {
        label: "Mercredi",
        services: [
          {
            start: "09:00",
            end: "14:30",
          },
          {
            start: "18:00",
            end: "22:00",
          },
        ],
      },
      {
        label: "Jeudi",
        services: [
          {
            start: "09:00",
            end: "14:30",
          },
          {
            start: "18:00",
            end: "22:00",
          },
        ],
      },
      {
        label: "Vendredi",
        services: [
          {
            start: "09:00",
            end: "14:30",
          },
          {
            start: "18:00",
            end: "22:00",
          },
        ],
      },
      {
        label: "Samedi",
        services: [
          {
            start: "18:00",
            end: "20:29",
          },
        ],
      },
      {
        label: "Dimanche",
        services: [
          {
            start: "09:00",
            end: "14:30",
          },
          {
            start: "18:00",
            end: "22:00",
          },
        ],
      },
    ],
    exceptionnalClosings: [
      {
        start: new Date("2024-10-01T00:00:00Z"),
        end: new Date("2024-11-07T00:00:00Z"),
      },
      // Ajoutez d'autres fermetures exceptionnelles si nécessaire
    ],
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",

  initialState,
  reducers: {
    createRefForEachFoodCategory: (state, action) => {
      state.menu.map((foodCategory) => ({
        ...foodCategory,
        ref: createRef(),
      }));
    },
  },
});

export const { createRefForEachFoodCategory } = restaurantSlice.actions;
export default restaurantSlice.reducer;
