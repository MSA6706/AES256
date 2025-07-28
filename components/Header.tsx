
import React from 'react';
import { LockKeyholeIcon } from './Icons';

export const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-2">
                <LockKeyholeIcon className="h-8 w-8 text-indigo-400" />
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                    ابزار رمزنگاری AES-256
                </h1>
            </div>
            <p className="text-md text-gray-400">متن خود را با استاندارد صنعتی به سادگی امن کنید.</p>
        </header>
    );
};
