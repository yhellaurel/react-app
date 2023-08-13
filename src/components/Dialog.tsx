import { Button } from "components";
import ReactDOM from "react-dom";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  show: boolean;
  onClose: () => void;
}

export default function Dialog({
  title,
  show,
  onClose,
  children,
  ...defaultProps
}: DialogProps) {
  if (!show) {
    return null;
  }

  // Hinihiwalay sa root yung components
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        role="none"
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose} // Close on overlay click
      />
      <div
        className="z-10 px-4 pb-4 bg-white rounded-lg shadow-md"
        {...defaultProps}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold mt-3">{title}</h2>
          <Button
            onClick={onClose} // Close on button click
            className="bg-gray-200 mt-2 hover:bg-gray-400 text-gray-400 font-semibold hover:text-white py-1 px-2 hover:border-transparent rounded-lg"
          >
            X
          </Button>
        </div>
        <div className="text-center bg-red min-w-[300px]">{children}</div>
      </div>
    </div>,
    document.body
  );
}

Dialog.defaultProps = {
  title: "",
};
