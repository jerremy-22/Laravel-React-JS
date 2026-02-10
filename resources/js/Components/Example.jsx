import React from 'react';

export default function Example({ message = 'Hello React in Laravel!' }) {
    return (
        <div className="p-6 rounded-lg bg-white shadow dark:bg-zinc-900">
            <h3 className="text-lg font-semibold">Example Component</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{message}</p>
        </div>
    );
}
