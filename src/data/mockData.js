export const rooms = [
  {
    id: 'living',
    name: 'Living Room',
    image: '/assets/living.jpg',
    devices: [
      { id: 1, name: 'Smart Light', icon: '💡', status: false },
      { id: 2, name: 'AC', icon: '❄️', status: true }
    ]
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: '/assets/bedroom.jpg',
    devices: [
      { id: 3, name: 'Fan', icon: '🌀', status: true },
      { id: 4, name: 'Lamp', icon: '🛋️', status: false }
    ]
  }
];
