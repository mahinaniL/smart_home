import React, { createContext, useState } from 'react';
import { rooms as mockRooms } from '../data/mockData';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(mockRooms[0]);
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('rooms');
    return saved ? JSON.parse(saved) : mockRooms;
  });

  const toggleDevice = (roomId, deviceId) => {
    const updated = rooms.map(room => {
      if (room.id === roomId) {
        room.devices = room.devices.map(device =>
          device.id === deviceId ? { ...device, status: !device.status } : device
        );
      }
      return room;
    });
    setRooms(updated);
    localStorage.setItem('rooms', JSON.stringify(updated));
  };

  return (
    <RoomContext.Provider value={{ rooms, selectedRoom, setSelectedRoom, toggleDevice }}>
      {children}
    </RoomContext.Provider>
  );
};
