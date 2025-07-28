
import React from 'react';

interface LabeledInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    type?: string;
    isTextArea?: boolean;
    readOnly?: boolean;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    isTextArea = false,
    readOnly = false,
}) => {
    const commonClasses = `
        block w-full bg-gray-900/50 border border-gray-600 rounded-md shadow-sm 
        py-2 px-3 text-gray-200 placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
        transition-all duration-200
        ${readOnly ? 'cursor-not-allowed opacity-70' : ''}
    `;

    const InputComponent = isTextArea ? 'textarea' : 'input';
    
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <InputComponent
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                {...(isTextArea ? { rows: 4 } : { type: type })}
                className={`${commonClasses} ${isTextArea ? 'min-h-[100px] resize-y' : ''}`}
            />
        </div>
    );
};
