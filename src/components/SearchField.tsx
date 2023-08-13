import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SearchFieldInterface {
  label: string;
  name: string;
  placeholder?: string;
  readonly?: boolean;
  setState?: Dispatch<SetStateAction<string>>;
}

export default function SearchField({
  label,
  name,
  readonly,
  setState,
  placeholder,
}: SearchFieldInterface) {
  const [searchFieldValue, setSearchFieldValue] = useState("");
  // console.log(searchFieldValue, "search value")

  useEffect(() => {
    // setTimeout(()=>{
    if (setState) {
      setState(searchFieldValue);
    }
    // }, 500)
  }, [searchFieldValue]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // setTimeout(()=> {
    setSearchFieldValue(newValue);
    // }, 400)
  };
  return (
    <div className={`text-sm ${!readonly ? "block" : "hidden"}`}>
      <label className="block text-sm text-gray-600 text-left">{label}</label>
      <input
        placeholder={placeholder}
        name={name}
        value={searchFieldValue}
        onChange={handleSelectChange}
        type="search"
        className="w-full px-0 py-1 pl-2 pr-2 mt-8 test-sm text-gray-800 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        readOnly={readonly}
      />
    </div>
  );
}
