import React from 'react';

const Menu = () => {
  const menuItems = [
    { id: 1, name: 'Burger', price: '$5' },
    { id: 2, name: 'Pizza', price: '$8' },
    { id: 3, name: 'Pasta', price: '$7' },
    { id: 4, name: 'Salad', price: '$4' },
  ];

  return (
    <div>
      <h1>Canteen Menu</h1>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>{item.name} - {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;