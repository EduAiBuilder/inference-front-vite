import React from 'react';
import { useSearchParams } from 'react-router-dom';

const App: React.FC = () => {
    const [searchParams] = useSearchParams();

    const model = searchParams.get('model'); // Access 'cameraId' query parameter

    return (
        <div>
            <h1>Camera Page</h1>
            <p>model ID: {model}</p>
        </div>
    );
};

export default App;
