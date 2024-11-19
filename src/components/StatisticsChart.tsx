/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatData {
    downloads: number;
    mrdownloads: number;
    views: number;
    date: string;
    id: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg shadow-lg">
                <p className="font-medium mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-zinc-600 dark:text-zinc-400">
                            {entry.name}:
                        </span>
                        <span className="font-medium">
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const StatisticsChart = () => {
    const [data, setData] = useState<StatData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/statistics');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const result: StatData[] = await response.json();
                setData(result);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
                console.error('Error fetching statistics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return (
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Statistics</h3>
                <div className="h-[400px] w-full flex items-center justify-center">
                    <p className="text-zinc-600 dark:text-zinc-400">Loading statistics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Statistics</h3>
                <div className="h-[400px] w-full flex items-center justify-center">
                    <p className="text-red-600 dark:text-red-400">Failed to load data: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Statistics</h3>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
                        <XAxis
                            dataKey="date"
                            className="text-zinc-600 dark:text-zinc-400"
                            tick={{ fill: 'currentColor' }}
                        />
                        <YAxis
                            className="text-zinc-600 dark:text-zinc-400"
                            tick={{ fill: 'currentColor' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="downloads"
                            name="Downloads"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="mrdownloads"
                            name="MR Downloads"
                            stroke="#16a34a"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="views"
                            name="Views"
                            stroke="#ea580c"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default StatisticsChart;
