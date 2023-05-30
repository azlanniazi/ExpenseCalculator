import { ChangeEvent } from "react";

interface FormGroupProps {
  labelText: string;
  inputType: string;
  placeholder?: string;
  values: string | number;
  //   onInput?: () => void;
  //   onKeyUp?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  //   readOnly?: boolean;
  //   reference?: string;
  //   name: string;
}

export default function FormGroup({
  labelText,
  inputType,
  placeholder,
  values,
  className,
  onChange,
}: FormGroupProps) {
  return (
    <div className="form-group">
      <label>{labelText}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        value={values}
        onChange={onChange}
        className={className}
      />
    </div>
  );
}
