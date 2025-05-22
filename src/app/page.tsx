"use client"

import { useState } from "react";

// Define the SportInfo type locally since we can't import from baml_client in browser
interface SportInfo {
  name: string
  description: string
  origin: string
  equipment: string[]
  players_count: string
  fun_facts: string[]
}

const SPORTS_LIST = [
  "Basketball",
  "Soccer (Football)",
  "Tennis",
  "Baseball",
  "American Football",
  "Cricket",
  "Rugby",
  "Golf",
  "Swimming",
  "Athletics (Track and Field)",
  "Boxing",
  "Volleyball",
  "Hockey",
  "Table Tennis",
  "Badminton",
];

export default function SportsInfoPage() {
  const [selectedSport, setSelectedSport] = useState("");
  const [sportInfo, setSportInfo] = useState<SportInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetSportInfo = async () => {
    if (!selectedSport) {
      setError("Please select a sport first!");
      return;
    }

    setLoading(true);
    setError(null);
    setSportInfo(null);

    try {
      // Call our API route instead of BAML directly
      const response = await fetch('/api/sports-rest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sport_name: selectedSport }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sport information');
      }

      const data = await response.json();
      setSportInfo(data);
    } catch (err) {
      setError("Failed to get sport information. Please try again.");
      console.error("Error fetching sport info:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🏆 Sports Information Hub
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label
                htmlFor="sport-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select a Sport
              </label>
              <select
                id="sport-select"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a sport...</option>
                {SPORTS_LIST.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGetSportInfo}
              disabled={loading || !selectedSport}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Getting Info..." : "Get Sport Info"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {sportInfo && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">🏃‍♂️</span>
              {sportInfo.name}
            </h2>

            <div className="grid gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {sportInfo.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Origin
                  </h3>
                  <p className="text-gray-600">{sportInfo.origin}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Players
                  </h3>
                  <p className="text-gray-600">{sportInfo.players_count}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Equipment Needed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sportInfo.equipment.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Fun Facts
                </h3>
                <ul className="space-y-2">
                  {sportInfo.fun_facts.map((fact, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-600">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}