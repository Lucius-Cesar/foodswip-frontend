export default function FoodSupplementsCheckBoxGroup({
  label,
  items,
  selectedSupplements,
  setChosenSupplements,
}) {
  const onChangeCheckBox = (event, index) => {
    const concernedSupplement = items[index];
    let updatedChosenSupplements = [...selectedSupplements];
    if (event.target.checked) {
      updatedChosenSupplements.push(concernedSupplement);
    } else {
      //find the index of the concerned Supplement in selectedSupplements array
      const concernedSupplementDeleteIndex = updatedChosenSupplements.findIndex(
        (supplement) =>
          supplement.value === concernedSupplement.value &&
          supplement.price === concernedSupplement.price
      );
      updatedChosenSupplements.splice(concernedSupplementDeleteIndex, 1);
    }
    setChosenSupplements(updatedChosenSupplements);
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
