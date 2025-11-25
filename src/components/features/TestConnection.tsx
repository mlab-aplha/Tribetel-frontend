import React, { useEffect, useState } from 'react';
import { testService } from '../../services/testService';

const TestConnection: React.FC = () => {
    const [status, setStatus] = useState<string>('Checking...');
    const [hotels, setHotels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const testConnection = async () => {
            try {
                setLoading(true);
                // Test health endpoint
                const health = await testService.healthCheck();
                setStatus(` Backend is healthy: ${health.status}`);

                // Test hotels endpoint
                const hotelsData = await testService.getHotels();
                setHotels(hotelsData.hotels || hotelsData || []);
            } catch (error) {
                setStatus(` Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        };

        testConnection();
    }, []);

    if (loading) {
        return <div style={{ padding: '20px' }}>Testing API connection...</div>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
            <h3>API Connection Test</h3>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Hotels Count:</strong> {hotels.length}</p>
            {hotels.length > 0 && (
                <div>
                    <h4>Sample Hotels:</h4>
                    <ul>
                        {hotels.slice(0, 3).map((hotel: any) => (
                            <li key={hotel.id}>
                                <strong>{hotel.name}</strong> - {hotel.location}
                                {hotel.price_per_night && ` - $${hotel.price_per_night}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TestConnection;