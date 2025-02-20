import MainPromo from '@/components/Promo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SearchResults from '@/components/SearchResults';

export default function MainPage() {
  return (
    <>
      <Header />
      <MainPromo />
      <SearchResults />
      <Footer />
    </>
  );
}
