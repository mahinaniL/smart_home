import React, { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

export default function RoomCard({ room }) {
  const { selectedRoom, setSelectedRoom } = useContext(RoomContext);
  const activeCount = room.devices.filter(d => d.status).length;

  return (
    <div
      onClick={() => setSelectedRoom(room)}
      className={`relative m-2 p-4 w-44 h-36 rounded-2xl text-white cursor-pointer bg-cover bg-center transition-all duration-300 transform hover:scale-105 backdrop-blur-md shadow-lg ${
        selectedRoom.id === room.id ? 'ring-4 ring-blue-500' : ''
      }`}
      style={{ backgroundImage: `url(${room.image})` }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl z-0"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-start">
        <h3 className="text-lg font-semibold drop-shadow-lg">{room.name}</h3>
        <p className="text-sm text-gray-200 drop-shadow-md">{activeCount} device(s) on</p>
      </div>
    </div>
  );
}
