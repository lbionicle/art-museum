import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

import './layout.scss';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
}
