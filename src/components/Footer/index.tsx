import darkLogo from '@/assets/logos/dark-museum-logo.svg';
import modsen from '@/assets/logos/modsen.svg';

import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__logo footer__logo--museum">
            <img src={darkLogo} alt="Logo" />
          </div>
          <div className="footer__logo footer__logo--modsen">
            <img src={modsen} alt="Modsen" />
          </div>
        </div>
      </div>
    </footer>
  );
}
