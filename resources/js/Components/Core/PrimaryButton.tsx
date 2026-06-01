import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `btn bg-blue-600 hover:bg-blue-700 border-none text-white ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
