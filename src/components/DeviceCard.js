import React, { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

export default function DeviceCard({ device, roomId }) {
  const { toggleDevice } = useContext(RoomContext);

  return (
    <div className={`p-4 rounded-2xl w-36 text-center bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e] text-white shadow-xl hover:shadow-blue-500/40 transition-transform duration-300 hover:scale-105`}>
      <div className="text-4xl mb-2 drop-shadow-glow">{device.icon}</div>
      <div className="font-semibold text-sm">{device.name}</div>

      <label className="flex items-center justify-center mt-3 space-x-2 text-sm">
        <input
          type="checkbox"
          className="form-checkbox accent-blue-500 rounded-md w-4 h-4"
          checked={device.status}
          onChange={() => toggleDevice(roomId, device.id)}
        />
        <span className="text-xs">{device.status ? 'ON' : 'OFF'}</span>
      </label>
    </div>
  );
}
