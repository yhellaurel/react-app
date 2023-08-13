import { useState, Dispatch, SetStateAction, useEffect } from "react";

interface CheckboxProps {
  label?: string;
  name: string;
  propVal: any;
  setState: Dispatch<SetStateAction<string[]>>;
}

export default function Checkbox({
  label,
  name,
  propVal,
  setState,
}: CheckboxProps) {
  const [localValues, setLocalValues] = useState<string>("");
  const [inputChecked, setInputChecked] = useState(false);

  useEffect(() => {
    if (inputChecked) {
      setState((prevState) => [...prevState, localValues]);
    } else {
      setState((prevState) => prevState.filter((id) => id !== propVal.id));
    }
  }, [inputChecked]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setInputChecked(isChecked);

    if (isChecked) {
      setLocalValues(propVal.id);
    } else {
      setLocalValues("");
    }
  };

  return (
    <label className="flex items-center text-gray-600 mb-2">
      <input
        type="checkbox"
        name={name}
        className="mr-2 accent-blue-500"
        onChange={onChange}
        key={propVal.id}
      />
      {label ?? ""}
    </label>
  );
}
