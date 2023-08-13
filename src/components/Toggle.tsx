interface ToggleProps {
  label: string;
  checked: boolean;
  name: string;
  onChange: (newValue: boolean) => void;
}

export default function Toggle({
  label,
  checked,
  name,
  onChange,
}: ToggleProps) {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center mb-4 items-stretch cursor-pointer">
      <label className="relative inline-flex cursor-pointer">
        <input
          type="checkbox"
          value={`${checked}`}
          name={name}
          className="sr-only peer"
          checked={checked}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 mt-1 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6.5px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </label>
      <span className="ml-2 self-center text-sm font-medium m-2 text-gray-600 dark:text-gray-500">
        {label}
      </span>
    </div>
  );
}
