import { Input as InputComponent } from "@/components/ui/input"
import { ReactNode, InputHTMLAttributes, HTMLAttributes, forwardRef } from "react";

type InputProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Input = ({ children, ...rest }: InputProps) => {
  return (
    <div className="w-full relative border-none" {...rest}>
      {children}
    </div>
  );
};

const Field = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function FieldComponent({ ...rest }, ref) {
    return (
      <InputComponent
        type="text"
        ref={ref} 
        className="py-6 px-5 text-gray-400 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-green-200 focus:text-gray-200 border-gray-500"
        {...rest}
      />
    );
  }
);


const IconRight = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-5 cursor-pointer" {...rest}>
      {children}
    </div>
  );
};

Input.Field = Field;
Input.IconRight = IconRight;

export { Input };