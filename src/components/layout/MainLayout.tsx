import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingActions } from '@/components/conversion/FloatingActions';

export function MainLayout() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--header-height)', flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
