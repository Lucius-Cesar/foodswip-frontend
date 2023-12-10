
import CartIcon from "../ui/icons/CartIcon"
import {useState} from "react"
export default function CartBtn({className, onClick, isCartOpen}){
    const [isHovered, setIsHovered] = useState(false);
    const primary = "#F97247"
    const handleMouseOver = () => {
        setIsHovered(true);
      };
    
      const handleMouseOut = () => {
        setIsHovered(false);
      };

    return(
    <button type = "button" className = {`flex justify-center items-center rounded-3xl ${isHovered || isCartOpen ? "bg-white outline outline-primary" : "bg-primary"} rounded-xl h-fit w-fit sm:rounded-2xl ${className}`}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    onClick = {onClick}>
        <div className = "h-11 w-11 sm:h-16 sm:w-16">
            <CartIcon color = {isHovered || isCartOpen ? primary : "white"} className ="w-full h-full"/>
        </div>
    </button>
    )
}