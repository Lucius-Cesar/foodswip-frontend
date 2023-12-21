import TabBtn from "../ui/TabBtn"

import {useDispatch, useSelector} from "react-redux"

export default orderTabBtn = () => {
    const orderTypes = ["Livraison", "À emporter"]
    const orderSettings = useSelector((state) => state.restaurant.orderSettings);
    const deliveryType = useSelector((state) => state.cart.deliveryType);

    const [currentValue, setCurrentValue] = useState(0)

    return(
        <TabBtn values = {orderTypes}/>

    )
}