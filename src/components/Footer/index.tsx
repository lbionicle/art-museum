import darkLogo from '@/assets/logos/dark-museum-logo.svg';
import modsen from '@/assets/logos/modsen.svg';

import './footer.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <Link to={'/'} className="footer__logo footer__logo--museum">
            <img src={darkLogo} alt="Logo" />
          </Link>
          <Link
            to={'https://www.modsen-software.com/'}
            className="footer__logo footer__logo--modsen"
          >
            <img src={modsen} alt="Modsen" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
