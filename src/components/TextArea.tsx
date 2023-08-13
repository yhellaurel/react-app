interface TextAreaProps {
  label: string;
  name: string;
  readonly?: boolean;
}

export default function TextArea({ label, name, readonly }: TextAreaProps) {
  return (
    <div className={`mb-4 ${!readonly ? "lg:block" : "lg:hidden"}`}>
      <label className="block text-sm text-gray-600 text-left">{label}</label>
      <textarea
        minLength={!readonly ? 1 : 0}
        required={!readonly}
        title={!readonly ? "Must have a value" : ""}
        name={name}
        rows={4}
        className="w-full px-3 py-2 mt-1 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        readOnly={readonly}
      />
    </div>
  );
}

TextArea.defaultProps = {
  readonly: false,
};
