
import React, { useState, useCallback } from 'react';
import { encryptText, decryptText } from './services/cryptoService';
import { Header } from './components/Header';
import { LabeledInput } from './components/LabeledInput';
import { ActionButton } from './components/ActionButton';
import { LockIcon, UnlockIcon, AlertTriangleIcon } from './components/Icons';
import { OutputBox } from './components/OutputBox';

const App: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [secretKey, setSecretKey] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleAction = useCallback(async (action: 'encrypt' | 'decrypt') => {
        if (!inputText || !secretKey) {
            setError('لطفاً متن ورودی و کلید رمزنگاری را وارد کنید.');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setOutputText('');
        
        // Add a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));

        try {
            const result = action === 'encrypt'
                ? encryptText(inputText, secretKey)
                : decryptText(inputText, secretKey);
            setOutputText(result);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('یک خطای ناشناخته رخ داد.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [inputText, secretKey]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-2xl mx-auto">
                <Header />
                <div className="bg-gray-800/50 shadow-2xl shadow-indigo-500/10 ring-1 ring-white/10 rounded-xl p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <LabeledInput
                            id="input-text"
                            label="متن ورودی"
                            placeholder="متنی که میخواهید رمزگذاری یا رمزگشایی کنید را اینجا وارد کنید..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            isTextArea={true}
                        />
                        <LabeledInput
                            id="secret-key"
                            label="کلید رمزنگاری (Key)"
                            placeholder="یک کلید امن وارد کنید"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            type="password"
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <ActionButton onClick={() => handleAction('encrypt')} disabled={isLoading} variant="primary">
                            <LockIcon />
                            {isLoading ? 'در حال رمزگذاری...' : 'رمزگذاری'}
                        </ActionButton>
                        <ActionButton onClick={() => handleAction('decrypt')} disabled={isLoading} variant="secondary">
                            <UnlockIcon />
                            {isLoading ? 'در حال رمزگشایی...' : 'رمزگشایی'}
                        </ActionButton>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg p-3 text-sm animate-fade-in">
                            <AlertTriangleIcon />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    <OutputBox label="نتیجه" text={outputText} isLoading={isLoading} />
                </div>
                <footer className="text-center mt-8 text-gray-500 text-xs">
                    <p>ساخته شده با React و Tailwind CSS</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
