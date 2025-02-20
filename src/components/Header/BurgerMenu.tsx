import { Link } from 'react-router';

import useModal from '@/hooks/useModal';
import home from '@/assets/icons/home.svg';
import favourites from '@/assets/icons/yellow-bookmark.svg';

import './header.scss';

interface BurgerMenuProps {
  onClose: () => void;
}

export default function BurgerMenu({ onClose }: BurgerMenuProps) {
  useModal({ onClose: onClose });

  return (
    <div className="burger-menu">
      <div className="burger-menu__overlay" onClick={onClose}></div>
      <div className="burger-menu__content">
        <button className="burger-menu__close" onClick={onClose} aria-label="Close menu">
          <span className="burger-menu__close--cross"></span>
        </button>
        <nav className="burger-menu__nav">
          <Link to="/" className="burger-menu__nav-item" onClick={onClose}>
            <img src={home} alt="Home" />
            Home
          </Link>
          <Link to="/user/favourites" className="burger-menu__nav-item" onClick={onClose}>
            <img src={favourites} alt="Favourites" />
            Your favorites
          </Link>
        </nav>
      </div>
    </div>
  );
}
