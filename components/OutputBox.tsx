
import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon, LoadingSpinnerIcon } from './Icons';

interface OutputBoxProps {
    label: string;
    text: string;
    isLoading: boolean;
}

export const OutputBox: React.FC<OutputBoxProps> = ({ label, text, isLoading }) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const handleCopy = () => {
        if (text) {
            navigator.clipboard.writeText(text);
            setIsCopied(true);
        }
    };

    return (
        <div className="relative">
            <label htmlFor="output-text" className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <div className="relative">
                <textarea
                    id="output-text"
                    readOnly
                    value={text}
                    placeholder={isLoading ? '' : 'نتیجه در اینجا نمایش داده می‌شود...'}
                    className="block w-full h-40 bg-gray-900/50 border border-gray-600 rounded-md shadow-sm py-2 pl-3 pr-10 text-gray-200 placeholder-gray-500 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                />
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-md">
                        <LoadingSpinnerIcon />
                    </div>
                )}
                {text && !isLoading && (
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200"
                        aria-label="کپی در کلیپ بورد"
                    >
                        {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
                    </button>
                )}
            </div>
        </div>
    );
};
