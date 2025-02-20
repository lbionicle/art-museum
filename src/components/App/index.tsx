import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element />
          <Route path="/artworks/:id" element />
          <Route path="/user/favorites" element />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
