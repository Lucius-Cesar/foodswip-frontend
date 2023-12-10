"use client";
import {useState} from "react"
export default function TabBtn({values}) {
    const [currentValue, setCurrentValue] = useState(values[0])

    return(
    <div className = "flex flex-row justify-center items-center bg-light-grey w-fit h-fit p-1 rounded-s-full rounded-e-full">
        {
        values.map((value,i) => 
        <button
        type = "button"
        onClick = {() => setCurrentValue(value)}
        key = {i} 
        className ={`${currentValue === value ? "bg-primary text-white" : "bg-light-grey text-dark-grey"} table ps-5 pe-5 w-48 rounded-s-full rounded-e-full hover:bg-light-grey-700 focus:bg-primary focus:text-white h-8`}> 
            {value}
        </button>)
        }
    </div>
    )
}