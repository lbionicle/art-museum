import MainPromo from '@/components/Promo';
import SearchResults from '@/components/SearchResults';
import Gallery from '@/components/Gallery';
import ArtRecs from '@/components/ArtRecs';
import Layout from '@/components/Layout';

export default function MainPage() {
  return (
    <Layout>
      <MainPromo />
      <SearchResults />
      <Gallery />
      <ArtRecs />
    </Layout>
  );
}
