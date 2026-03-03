import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="app-container">
            <header className="glass">
                <div className="logo">
                    <i className="fas fa-utensils"></i>
                    SmartCTX
                </div>
                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#features" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>О сервисе</a>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/menu')}
                    >
                        Открыть Меню <i className="fas fa-arrow-right"></i>
                    </button>
                </nav>
            </header>

            <main className="hero-section animate-fade">
                <h1>Умное питание для <br /> <span>вашего будущего</span></h1>
                <p>Заказывайте любимые блюда из школьной столовой в пару кликов. Никаких очередей, только вкусная и полезная еда.</p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <button className="btn-primary" onClick={() => navigate('/menu')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Заказать еду
                    </button>
                    <button className="glass" style={{ padding: '1rem 2.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
                        Узнать больше
                    </button>
                </div>

                <div className="stats-grid">
                    <div className="stat-card glass">
                        <i className="fas fa-clock"></i>
                        <h3>0 мин</h3>
                        <p>Очереди в столовой</p>
                    </div>
                    <div className="stat-card glass">
                        <i className="fas fa-apple-alt"></i>
                        <h3>100%</h3>
                        <p>Полезные продукты</p>
                    </div>
                    <div className="stat-card glass">
                        <i className="fas fa-user-check"></i>
                        <h3>2.5k</h3>
                        <p>Довольных учеников</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;