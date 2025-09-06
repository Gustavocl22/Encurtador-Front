// src/App.tsx
import React, { useEffect } from 'react';
import UrlShortener from '../components/UrlShortener';

const App: React.FC = () => {
    useEffect(() => {
        document.body.classList.add('dark-mode');
    }, []);

    return (
        <div>
            <UrlShortener />
        </div>
    );
};

export default App;
