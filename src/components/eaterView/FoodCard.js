"use client";

import { useEffect, useState } from 'react'
import AddBtn from '../ui/AddBtn';
export default function FoodCard({food}) {

    return (
        <div className = "flex flex-row items-center justify-between w-11/12 md:w-10/12 h-24 bg-magnolia rounded-lg border border-gravel mt-3 mb-3 p-4">
            <div className = "flex flex-col">
                <p className = "font-semibold	">{food.value}</p>
                <p>{food.description.join(", ")}</p>
                <p>{food.price + " €"}</p>
            </div>
            <AddBtn/>
        </div>
    )
  }