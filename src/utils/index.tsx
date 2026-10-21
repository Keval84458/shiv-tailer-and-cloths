import type { InputHTMLAttributes } from "react";
import type { TextareaHTMLAttributes } from "react";
import type { ButtonHTMLAttributes } from "react";

type ThemeInputProps = {
    labelClasses?: string;
} & InputHTMLAttributes<HTMLInputElement>;

type ThemeTextareaProps = {
    labelClasses?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;


type ThemeButtonProps = {
    label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ThemeInput = ({ className = "", labelClasses = "", ...rest }: ThemeInputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <input
                type="text"
                className={`text-[18px] px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 ${className}`}
                {...rest}
            />
        </div>
    );
};


export const ThemeTextarea = ({
    className = "",
    labelClasses = "",
    ...rest
}: ThemeTextareaProps) => {
    return (
        <div className="flex flex-col gap-1">
            <textarea
                className={`text-[18px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 ${className}`}
                {...rest}
            />
        </div>
    );
};

export const ThemeButton = ({
    label,
    className = "",
    type = "button",
    ...rest
}: ThemeButtonProps) => {
    return (
        <button
            type={type}
            className={`px-4 py-2 text-[18px] font-medium text-white bg-purple-600 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            {label}
        </button>
    );
};
