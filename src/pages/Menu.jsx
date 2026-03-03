import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    id: 1,
    name: "Борщ Домашний",
    category: "Супы",
    price: 900,
    calories: 250,
    image: "https://images.unsplash.com/photo-1547592166-23acbe3a624b?auto=format&fit=crop&w=500&q=60",
    description: "Традиционный свекольный суп со сметаной и зеленью."
  },
  {
    id: 2,
    name: "Котлета по-киевски",
    category: "Горячее",
    price: 1200,
    calories: 550,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=60",
    description: "Сочная куриная грудка с маслом и зеленью внутри."
  },
  {
    id: 3,
    name: "Салат Цезарь",
    category: "Салаты",
    price: 1050,
    calories: 320,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=60",
    description: "Классический рецепт с курицей, сухариками и пармезаном."
  },
  {
    id: 4,
    name: "Пюре с гуляшом",
    category: "Горячее",
    price: 1100,
    calories: 450,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=60",
    description: "Нежное картофельное пюре с мясной подливой."
  }
];

const categories = ["Все", "Супы", "Горячее", "Салаты", "Напитки"];

const Menu = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredItems = activeCategory === "Все"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="app-container">
      <header className="glass">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <i className="fas fa-utensils"></i>
          SmartCTX
        </div>
        <div style={{ position: 'relative' }}>
          <button className="btn-primary">
            <i className="fas fa-shopping-cart"></i>
            <span>0</span>
          </button>
        </div>
      </header>

      <main className="menu-container animate-fade">
        <div className="menu-header">
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Наше Меню</h2>
            <p style={{ color: 'var(--text-dim)' }}>Выберите самое вкусное для вашего перекуса</p>
          </div>
        </div>

        <div className="category-tags">
          {categories.map(cat => (
            <div
              key={cat}
              className={`cat-tag ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        <div className="food-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="food-card glass animate-fade">
              <img src={item.image} alt={item.name} className="food-image" />
              <div className="food-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 className="food-name">{item.name}</h3>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>🔥 {item.calories} ккал</span>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>{item.description}</p>
                <div className="food-meta">
                  <span className="food-price">{item.price} ₸</span>
                  <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <i className="fas fa-plus"></i> В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;