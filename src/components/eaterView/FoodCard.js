import { useEffect, useState } from 'react'
import AddBtn from '../ui/AddBtn';
import ModalFood from './ModalFood'
export default function FoodCard({food}) {
    const [isModalOpen, setModalOpen] = useState(false)
    const onClickAddBtn = () => {
        food.options.length > 0 || food.supplements.length > 0 ? setModalOpen(true) : null
    }

    return (
        <div className = "flex flex-row items-center justify-between w-10/12 md:w-10/12 min-h-32 h-auto bg-magnolia rounded-lg border border-gravel mt-3 mb-3 p-4">
            <div className = "flex flex-col justify-between h-full">
                <p className = "font-semibold	">{food.value}</p>
                <p>{food.description}</p>
                <p className = "font-bold"> {food.price + " €"}</p>
            </div>
            <AddBtn onClick = {onClickAddBtn}/>
            <ModalFood open = {isModalOpen} setOpen = {setModalOpen} food = {food}/>
        </div>
    )
  }