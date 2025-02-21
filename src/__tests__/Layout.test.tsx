import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '@/components/Layout';

describe('Layout', () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>,
    );

  test('renders children content', () => {
    setup();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders header and footer', () => {
    setup();
    expect(screen.getByAltText(/museum logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/modsen/i)).toBeInTheDocument();
  });
});
