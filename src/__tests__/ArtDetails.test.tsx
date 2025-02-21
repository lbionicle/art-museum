import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import defaultImage from '@/assets/images/default-art.svg';
import { useQuery } from '@tanstack/react-query';
import ArtDetails from '@/components/ArtDetails';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('ArtDetails Snapshot', () => {
  test('renders loading state correctly', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { container } = render(
      <MemoryRouter>
        <ArtDetails />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => jest.fn(),
  };
});

describe('ArtDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    const { container } = render(
      <MemoryRouter>
        <ArtDetails />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders nothing when data is null', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
    });
    const { container } = render(
      <MemoryRouter>
        <ArtDetails />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders artwork details correctly', () => {
    const mockData = {
      image: { src: 'image-src.jpg' },
      title: 'Artwork Title',
      artist: 'Artist Name',
      dateDisplay: '2020',
      nationality: 'Country',
      dimensions: '100x200',
      creditLine: 'Credit Info',
      repository: '<p>Repository Info</p>',
      isPublic: true,
    };
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });
    render(
      <MemoryRouter>
        <ArtDetails />
      </MemoryRouter>,
    );
    expect(screen.getByText('Artwork Title')).toBeInTheDocument();
    expect(screen.getByText('Artist Name')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('100x200')).toBeInTheDocument();
    expect(screen.getByText('Credit Info')).toBeInTheDocument();
    expect(screen.getByText('Repository Info')).toBeInTheDocument();
    expect(screen.getByText('Public')).toBeInTheDocument();
    expect(screen.getByAltText('Artwork Title')).toBeInTheDocument();
  });

  test('opens and closes modal when image is clicked', async () => {
    const mockData = {
      image: { src: 'image-src.jpg' },
      title: 'Artwork Title',
      artist: 'Artist Name',
      dateDisplay: '2020',
      nationality: 'Country',
      dimensions: '100x200',
      creditLine: 'Credit Info',
      repository: '<p>Repository Info</p>',
      isPublic: true,
    };
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });
    render(
      <MemoryRouter>
        <ArtDetails />
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    const image = screen.getByAltText('Artwork Title');
    await user.click(image);
    const modal = screen.getByRole('img', { name: 'Artwork Title' }).closest('.modal');
    expect(modal).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /×/i }));
    expect(
      screen.queryByRole('img', { name: 'Artwork Title' })?.closest('.modal'),
    ).not.toBeInTheDocument();
  });

  test('does not open modal when image src equals defaultImage', async () => {
    const mockData = {
      image: { src: defaultImage },
      title: 'Artwork Title',
      artist: 'Artist Name',
      dateDisplay: '2020',
      nationality: 'Country',
      dimensions: '100x200',
      creditLine: 'Credit Info',
      repository: '<p>Repository Info</p>',
      isPublic: true,
    };
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });
    render(
      <MemoryRouter>
        <ArtDetails />
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    const image = screen.getByAltText('Artwork Title');
    await user.click(image);
    expect(screen.queryByRole('button', { name: /×/i })).not.toBeInTheDocument();
  });
});
