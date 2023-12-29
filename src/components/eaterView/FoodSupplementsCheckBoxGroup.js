export default function FoodSupplementsCheckBoxGroup({
  label,
  items,
  chosenSupplements,
  setChosenSupplements,
}) {
  const onChangeCheckBox = (event, index) => {
    const concernedSupplement = items[index];
    let updatedChosenSupplements = [...chosenSupplements];
    if (event.target.checked) {
      updatedChosenSupplements.push(concernedSupplement);
    } else {
      //find the index of the concerned Supplement in chosenSupplements array
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
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                aria-describedby={`${item.value}-description`}
                name={item.value}
                value={i}
                onChange={(e) => onChangeCheckBox(e, i)}
                type="checkbox"
                className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary`}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor={item.value} className="font-medium text-gray-900">
                {item.value}
              </label>{" "}
              <span id={`${item.value}-description`} className="text-gray-500">
                <span className="sr-only">{item.value} </span>{" "}
                {item.price && `(+ ${item.price} €)`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
