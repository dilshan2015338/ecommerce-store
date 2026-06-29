import React from 'react';

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-blue-600 mb-4">
                        🛒 E-Commerce Shop
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Built with React + Vite + Tailwind CSS
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button className="btn-primary">Browse Products</button>
                        <button className="btn-secondary">View Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;