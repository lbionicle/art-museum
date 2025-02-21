import { Link } from 'react-router';

import useModal from '@/hooks/useModal';
import home from '@/assets/icons/home.svg';
import favorites from '@/assets/icons/yellow-bookmark.svg';

import './header.scss';

interface BurgerMenuProps {
  onClose: () => void;
}

const navItems = [
  { to: '/', icon: home, label: 'Home', className: 'header__nav-item--home' },
  { to: '/user/favorites', icon: favorites, label: 'Your favorites' },
];

export default function BurgerMenu({ onClose }: BurgerMenuProps) {
  useModal({ onClose: onClose });

  return (
    <div data-testid="burger-menu" className="burger-menu">
      <div className="burger-menu__overlay" onClick={onClose}></div>
      <div className="burger-menu__content">
        <button className="burger-menu__close" onClick={onClose} aria-label="Close menu">
          <span className="burger-menu__close--cross"></span>
        </button>
        <nav className="burger-menu__nav">
          {navItems.map(({ to, icon, label, className }) => {
            if (to === '/' && location.pathname === '/') {
              return null;
            }

            return (
              <Link key={to} to={to} className={`burger-menu__nav-item ${className || ''}`.trim()}>
                <img src={icon} alt="" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
