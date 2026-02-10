import React from 'react';
import { Head } from '@inertiajs/react';
import Example from '../Components/Example';

export default function NewPage({ message }) {
    return (
        <>
            <Head title="New Page" />
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-xl">
                    <h1 className="text-2xl font-bold mb-4">New Inertia React Page</h1>
                    <Example message={message} />
                </div>
            </div>
        </>
    );
}
