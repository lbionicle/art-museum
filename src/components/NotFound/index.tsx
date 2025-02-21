import { Link } from 'react-router-dom';
import './notFound.scss';

export default function NotFound() {
  return (
    <div className="container--notfound">
      <div className="error-container">
        <div className="error-number">
          <span>404</span>
        </div>
        <h2 className="error-message">
          <span>Page Not Found</span>
        </h2>
        <p className="error-text">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <Link to="/" className="home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
