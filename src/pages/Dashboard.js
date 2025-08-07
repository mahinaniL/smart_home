import React, { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../context/RoomContext';
import RoomCard from '../components/RoomCard';
import DeviceCard from '../components/DeviceCard';

export default function Dashboard() {
  const { rooms, selectedRoom } = useContext(RoomContext);
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [weatherError, setWeatherError] = useState(false);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const city = "Delhi";

    if (!apiKey) {
      console.warn("Missing API Key. Using fallback weather.");
      setWeather("28°C");
      setWeatherError(true);
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
      .then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const symbol = unit === "metric" ? "°C" : "°F";
        setWeather(data.main.temp + symbol);
        setWeatherError(false);
      })
      .catch(err => {
        console.error("Weather API failed:", err.message);
        setWeather("28°C");
        setWeatherError(true);
      });
  }, [unit]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-10 px-4">
      <div className="w-[420px] max-w-full h-auto rounded-[2.5rem] border-[10px] border-gray-700 bg-[#0b0b0b] shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">

        {/* Simulated notch */}
        <div className="w-20 h-1 bg-gray-500 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 z-50"></div>

        <div className="p-5 font-sans text-white">

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow">
                {greeting()}, <span className="text-blue-400">User 👋</span>
              </h1>
              <p className="text-sm mt-1 text-gray-400">
                Energy Usage: <span className="font-bold text-white">12.5 kWh</span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-sm text-white shadow-md">
              Weather: <strong>{weather || "Loading..."}</strong>
              <button
                className="ml-2 text-blue-300 underline"
                onClick={() => setUnit(prev => (prev === "metric" ? "imperial" : "metric"))}
              >
                Toggle °C/°F
              </button>
              {weatherError && (
                <div className="text-xs text-red-400 mt-1">* Fallback weather used</div>
              )}
            </div>
          </div>

          {/* Rooms */}
          <h2 className="text-sm font-semibold text-gray-300 mb-1">Rooms</h2>
          <div className="flex overflow-x-auto space-x-4 py-2 no-scrollbar">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          {/* Devices */}
          <h2 className="mt-5 text-sm font-semibold text-gray-300 mb-1">{selectedRoom.name} Devices</h2>
          <div className="grid grid-cols-2 gap-4">
            {selectedRoom.devices.map(device => (
              <DeviceCard key={device.id} device={device} roomId={selectedRoom.id} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
