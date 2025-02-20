import MainPromo from '@/components/Promo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SearchResults from '@/components/SearchResults';
import Gallery from '@/components/Gallery';
import ArtRecs from '@/components/ArtRecs';

export default function MainPage() {
  return (
    <>
      <Header />
      <MainPromo />
      <SearchResults />
      <Gallery />
      <ArtRecs />
      <Footer />
    </>
  );
}
