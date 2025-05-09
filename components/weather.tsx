import React from 'react';

interface WeatherProps {
    weatherAtLocation?: {
        location: string;
        temperature: number;
        celsius?: number;
    };
}

export function Weather({ weatherAtLocation }: WeatherProps = {}) {
    if (!weatherAtLocation) {
        return (
            <div className="flex flex-col gap-2 p-4 bg-card rounded-lg border">
                <div className="flex flex-row items-center gap-2">
                    <div className="font-medium">Weather</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground">Fetching weather data...</div>
                </div>
            </div>
        );
    }

    const { location, temperature, celsius } = weatherAtLocation;

    return (
        <div className="flex flex-col gap-2 p-4 bg-card rounded-lg border">
            <div className="flex flex-row items-center gap-2">
                <div className="font-medium">Weather in {location}</div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-sm text-muted-foreground">
                    {temperature}°F {celsius !== undefined ? `(${celsius}°C)` : ''}
                </div>
            </div>
        </div>
    );
} 