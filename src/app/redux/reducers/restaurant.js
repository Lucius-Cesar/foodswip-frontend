"use client";
import { createSlice } from '@reduxjs/toolkit';
import exampleMenu from '@/utils/exampleMenu';

const initialState = {
    name: "Dodopizza",
    uniqueValue: "dodopizza",
    mail: 'restaurant@dodopizza.com',
    website: 'www.dodopizza.com',
    adresse: '1, Rue des Dodos',
    postcode: 1000,
    ville: 'Bruxelles',
    phoneNumber: "+32407886655",
    menu: exampleMenu,
    orderSettings: {
        delivery: true,
        takeaway: true,
        pendingOrderAlert: {
            enabled: true,
            interval: 5
        },
        deliveryEstimate:{
            min: 30,
            max: 60
        },
        takeAwayPayments: [
            {
                value: "Paypal",
                enabled: true
            },
            {
                value: "Espèces",
                enabled: true

            },
            {
                value: "Carte de crédit",
                enabled: false
            }
        ],
        restaurantSettings: {
            schedulde: [
                {
                    day:0,
                    start: "09:00",
                    end: "14:30"
                },
                {
                    day:0,
                    start: "18:00",
                    end: "22:00"
                },
                {
                    day:1,
                    start: "09:00",
                    end: "14:30"
                },
                {
                    day:1,
                    start: "18:00",
                    end: "22:00"
                },
                {
                    day:2,
                    start: "09:00",
                    end: "14:30"
                },
                {
                    day:2,
                    start: "18:00",
                    end: "22:00"
                },
                {
                    day:3,
                    start: "09:00",
                    end: "14:30"
                },
                {
                    day:3,
                    start: "18:00",
                    end: "22:00"
                },
                {
                    day:4,
                    start: "09:00",
                    end: "14:30"
                },
                {
                    day:4,
                    start: "18:00",
                    end: "22:00"
                },
                {
                    day:5,
                    start: "09:00",
                    end: "14:30"
                },
                {
                    day:5,
                    start: "18:00",
                    end: "22:00"
                },
                
            ],
            exceptionnalClosings:[
                {
                    start: "2023-12-31T00:00:00Z",
                    end: "2023-01-01T00:00:00Z" 
                }
            ]
            
        }

    }
};

export const restaurantSlice = createSlice({
 name: 'restaurant',

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