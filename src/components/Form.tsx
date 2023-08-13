import { FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  formRef?: React.RefObject<HTMLFormElement>;
  onSubmit: (values: any) => void;
}

export default function Form({
  formRef,
  children,
  ...defaultProps
}: FormProps) {
  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formValues: { [key: string]: string } = {};

    // Iterate over form data to populate the formValues object
    formData.forEach((value, name) => {
      formValues[name] = value.toString();
    });

    if (defaultProps.onSubmit) {
      defaultProps.onSubmit(formValues);
    }
  };
  return (
    <form {...defaultProps} onSubmit={handleSubmit} ref={formRef}>
      {children}
    </form>
  );
}

Form.defaultProps = {
  formRef: null,
};
