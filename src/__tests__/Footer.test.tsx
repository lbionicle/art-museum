import Footer from '@/components/Footer';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Footer', () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

  test('renders museum logo with alt text "Logo"', () => {
    setup();
    const museumLogo = screen.getByAltText('Logo');
    expect(museumLogo).toBeInTheDocument();
    const museumLink = museumLogo.closest('a');
    expect(museumLink).toHaveAttribute('href', '/');
  });

  test('renders modsen logo with alt text "Modsen"', () => {
    setup();
    const modsenLogo = screen.getByAltText('Modsen');
    expect(modsenLogo).toBeInTheDocument();
    const modsenLink = modsenLogo.closest('a');
    expect(modsenLink).toHaveAttribute('href', 'https://www.modsen-software.com/');
  });
});
