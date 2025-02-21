import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ArtPage, FavoritePage, MainPage, Page404 } from '@/pages';

export default function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/artworks/:id" element={<ArtPage />} />
          <Route path="/user/favorites" element={<FavoritePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
