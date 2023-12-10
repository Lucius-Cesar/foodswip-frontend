
import CartIcon from "../ui/icons/CartIcon"
import {useState} from "react"
export default function CartBtn({className, onClick}){
    const [isHovered, setIsHovered] = useState(false);
    const primaryColor = "#F97247"
    const handleMouseOver = () => {
        setIsHovered(true);
      };
    
      const handleMouseOut = () => {
        setIsHovered(false);
      };

    return(
    <button type = "button" className = {`flex justify-center items-center rounded-3xl h-fit w-fit ${isHovered ? "bg-white outline outline-primary" : "bg-primary"} ${className}`}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    onClick = {onClick}>
        <CartIcon color = {isHovered ? primaryColor : "white"} className = "object-contain"/>
    </button>
    )
}