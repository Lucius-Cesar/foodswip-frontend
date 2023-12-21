import {useState} from 'react'

export default function FoodOptionsFormSelect({label, items, defaultValue, chosenOptions, setChosenOptions}) {
  const sortedItems = [...items].sort((a, b) => a.price - b.price)
  const [previousOption, setPreviousOption] = useState(sortedItems[0])

  const onChangeOption = (newOptionIndex) => {
    let updatedSelectedOptions = [...chosenOptions]

    const newItem = sortedItems[newOptionIndex]
    //check the previous selected option and replace it with the new option
    const indexOfPreviousOption = chosenOptions.findIndex(option => option.value === previousOption.value && option.price === previousOption.price);
    if (indexOfPreviousOption !== -1) {
       updatedSelectedOptions.splice(indexOfPreviousOption, 1, newItem);
    }
    else {
       updatedSelectedOptions = [...chosenOptions, newItem]
    }
      setChosenOptions(updatedSelectedOptions)
      //setPrevious option to the current option to allow the futur comparison
      setPreviousOption(newItem)

    }
    
    return (

      <div>
        <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <select
          id={label}
          name={label}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
          defaultValue = {sortedItems[0]}
          onChange = {(e) => onChangeOption(e.target.value)}
          >
            {sortedItems.map((item,i) => <option key = {i} value = {i}>{`${item.value} ${item.price ? "(+"+item.price+" €)" : ""}`}</option>)}
        </select>
      </div>
    )
  }