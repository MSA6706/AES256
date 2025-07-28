
import React from 'react';

interface ActionButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
    onClick, 
    disabled = false, 
    children,
    variant = 'primary'
}) => {
    const baseClasses = `
        flex items-center justify-center gap-2 w-full sm:w-auto
        px-6 py-3 border text-base font-semibold rounded-md shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
        transition-all duration-200 ease-in-out transform
        disabled:opacity-50 disabled:cursor-not-allowed
    `;
    
    const variantClasses = {
        primary: `
            bg-indigo-600 text-white border-transparent 
            hover:bg-indigo-700 disabled:hover:bg-indigo-600
            focus:ring-indigo-500
        `,
        secondary: `
            bg-gray-700 text-gray-200 border-gray-600
            hover:bg-gray-600 hover:text-white disabled:hover:bg-gray-700
            focus:ring-gray-500
        `
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]}`}
        >
            {children}
        </button>
    );
};
