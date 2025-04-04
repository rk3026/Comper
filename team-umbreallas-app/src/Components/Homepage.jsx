import React from 'react';
import './Homepage.css';
const trendingCompetitions = [
  {
    title: 'Competition Placeholder 1',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 10, 2025 10:00 AM',
    endTime: 'April 12, 2025 6:00 PM'
  },
  {
    title: 'Competition Placeholder 2',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 15, 2025 8:00 AM',
    endTime: 'April 16, 2025 4:00 PM'
  },
  {
    title: 'Competition Placeholder 3',
    description: 'This is a placeholder for a trending competition.',
    startTime: 'April 20, 2025 12:00 PM',
    endTime: 'April 22, 2025 8:00 PM'
  }
];

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="text-center py-10 bg-gray-800 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold">Welcome to Compers</h1>
        <p className="text-gray-300 mt-2">Your anonymous arena for competitive glory</p>
      </header>

      <section className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search competitions or topics..."
          className="w-[700px] p-4 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
        />
      </section>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Trending Competitions</h2>
        <div className="flex flex-col gap-6">
          {trendingCompetitions.map((comp, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{comp.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{comp.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Start:</strong> {comp.startTime}
              </p>
              <p className="text-sm text-gray-500">
                <strong>End:</strong> {comp.endTime}
              </p>
              <button className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition-colors">
                Join Anonymously
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
