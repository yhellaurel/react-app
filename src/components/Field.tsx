interface FieldProps {
  label: string;
  name: string;
  readonly?: boolean;
}

export default function Field({ label, name, readonly }: FieldProps) {
  return (
    <div className={`mb-4 ${!readonly ? "block" : "hidden"}`}>
      <label className="block text-sm text-gray-600 text-left">{label}</label>
      <input
        minLength={!readonly ? 1 : 0}
        required={!readonly}
        title={!readonly ? "Must have a value" : ""}
        name={name}
        type="text"
        className="w-full px-3 py-2 mt-1 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        readOnly={readonly}
      />
    </div>
  );
}

Field.defaultProps = {
  readonly: false,
};
