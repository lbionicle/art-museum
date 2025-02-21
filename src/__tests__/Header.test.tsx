import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from '@/components/Header';

describe('Header', () => {
  const setup = (path = '/') =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Header />
      </MemoryRouter>,
    );

  test('renders the logo and burger button', () => {
    setup();
    expect(screen.getByAltText(/museum logo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
  });

  test('does not render "Home" link when on the root path', () => {
    setup('/');
    expect(screen.queryByRole('link', { name: /home/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /your favorites/i })).toBeInTheDocument();
  });

  test('renders "Home" link when not on the root path', () => {
    setup('/user/favorites');
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  test('opens and closes the burger menu', async () => {
    const user = userEvent.setup();
    setup();
    expect(screen.queryByTestId('burger-menu')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /toggle menu/i }));
    expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByTestId('burger-menu')).not.toBeInTheDocument();
  });
});
