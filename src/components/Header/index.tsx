import { Link, useLocation } from 'react-router-dom';

import lightLogo from '@/assets/logos/light-museum-logo.svg';
import home from '@/assets/icons/home.svg';
import favorites from '@/assets/icons/yellow-bookmark.svg';

import BurgerMenu from './BurgerMenu';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: home, label: 'Home', className: 'header__nav-item--home' },
  { to: '/user/favorites', icon: favorites, label: 'Your favorites' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to="/" className="header__logo">
            <img src={lightLogo} alt="Museum logo" />
          </Link>

          <nav className={`header__nav`}>
            {navItems.map(({ to, icon, label, className }) => {
              if (to === '/' && location.pathname === '/') {
                return null;
              }

              return (
                <Link key={to} to={to} className={`header__nav-item ${className || ''}`.trim()}>
                  <img src={icon} alt="" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setIsOpen(true)}
            className="header__burger"
            aria-label="Toggle menu"
          >
            <span className="header__burger-icon" />
          </button>
        </div>
      </div>
      {isOpen && <BurgerMenu onClose={() => setIsOpen(false)} />}
    </header>
  );
}
