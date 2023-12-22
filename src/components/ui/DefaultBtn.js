export default function DefaultBtn({value, onClick, className}) {
    return(
        <button
        type = "button"
        onClick = {onClick }
        className = {` text-white ps-5 pe-5 rounded-s-full rounded-e-full + ${className}`}> 
            {value}
        </button>
    )
}