import { useState, useEffect } from "react";

function FoodOptionsFormSelect({
  label,
  items,
  selectedOptions,
  setSelectedOptions,
}) {
  const [previousOption, setPreviousOption] = useState(items[0]);

  const onChangeOption = (newOptionIndex) => {
    let updatedSelectedOptions = [...selectedOptions];

    const newItem = items[newOptionIndex];

    //check the previous selected option and replace it with the new option
    const indexOfPreviousOption = selectedOptions.findIndex(
      (option) =>
        option.value === previousOption.value &&
        option.price === previousOption.price
    );
    if (indexOfPreviousOption !== -1) {
      updatedSelectedOptions.splice(indexOfPreviousOption, 1, newItem);
    } else {
      updatedSelectedOptions = [...selectedOptions, newItem];
    }
    setSelectedOptions(updatedSelectedOptions);
    //setPrevious option to the current option to allow the futur comparison
    setPreviousOption(newItem);
  };
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-medium sm:text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        id={label}
        name={label}
        className="mt-2 block w-full rounded-md border-0 py-3 sm:py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
        onChange={(e) => onChangeOption(e.target.value)}
        defaultValue={items[0]}
      >
        {items.map((item, i) => (
          <option key={i} value={i}>{`${item.value} ${
            item.price ? "(+" + item.price + " €)" : ""
          }`}</option>
        ))}
      </select>
    </div>
  );
}

function FoodOptionsCheckBoxGroup({
  label,
  items,
  selectedOptions,
  setSelectedOptions,
}) {
  const onChangeCheckBox = (event, index) => {
    const concernedOption = items[index];

    let updatedSelectedOptions = [...selectedOptions];
    if (event.target.checked) {
      updatedSelectedOptions.push(concernedOption);
    } else {
      //find the index of the concerned Supplement in selectedSupplements array
      const concernedOptionDeleteIndex = updatedSelectedOptions.findIndex(
        (option) =>
          option.value === concernedOption.value &&
          option.price === concernedOption.price
      );
      updatedSelectedOptions.splice(concernedOptionDeleteIndex, 1);
    }
    setSelectedOptions(updatedSelectedOptions);
  };
  return (
    <fieldset>
      <label
        htmlFor={label}
        className="block text-medium sm:text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        {label}
      </label>
      <div className="space-y-2 sm:space-y-1">
        {items.map((item, i) => (
          <div key={i} className="relative flex items-center">
            <div className="flex h-8 sm:h-6 justify-center items-center">
              <input
                aria-describedby={`${item.value}-description`}
                name={item.value}
                value={i}
                onChange={(e) => onChangeCheckBox(e, i)}
                type="checkbox"
                className={`h-6 w-6 sm:h-4 sm:w-4 rounded border-gray-300 text-primary focus:ring-primary`}
              />
            </div>
            <div className="flex flex-row items-center ml-3 text-medium sm:text-sm leading-6  space-x-1">
              <label htmlFor={item.value} className=" text-gray-900">
                {item.value}
              </label>
              <span id={`${item.value}-description`} className="text-gray-500">
                <span className="sr-only">{item.value}</span>
                {item.price !== 0 && `(+ ${item.price} €)`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default function FoodOptions({
  label,
  isMultiChoices,
  items,
  selectedOptions,
  setSelectedOptions,
}) {
  if (isMultiChoices) {
    return (
      <FoodOptionsCheckBoxGroup
        label={label}
        items={items}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    );
  } else {
    return (
      <FoodOptionsFormSelect
        label={label}
        items={items}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    );
  }
}
