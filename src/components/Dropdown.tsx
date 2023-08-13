import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface DropdownProps {
  label: string;
  name: string;
  options: string[];
  setState?: Dispatch<SetStateAction<string>>;
}

export default function Dropdown({
  label,
  name,
  options,
  setState,
}: DropdownProps) {
  const [optionSelected, setOptionSelected] = useState("");

  useEffect(() => {
    if (setState && optionSelected.length === 0) {
      setOptionSelected(options[0]);
      setState(options[0]);
    }
  }, [optionSelected]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (setState) {
      setState(selectedValue);
      setOptionSelected(selectedValue);
    }
  };

  return (
    <div className="mb-4">
      <label className="w-24 block text-sm text-gray-600 text-left">
        {label}
      </label>
      <select
        name={name}
        onChange={handleSelectChange}
        className="w-full px-3 py-2 mt-1 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      >
        {options.map((option, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
