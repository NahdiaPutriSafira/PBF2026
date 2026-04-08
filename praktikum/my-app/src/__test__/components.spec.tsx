import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

import ProductView from '@/views/produk';
import DetailProduct from '@/views/DetailProduct';
import AppShell from '@/component/layouts/Appshell';
import Navbar from '@/component/layouts/navbar';

const mockUseRouter = useRouter as jest.Mock;
const mockUseSession = useSession as jest.Mock;
const mockSignIn = signIn as jest.Mock;
const mockSignOut = signOut as jest.Mock;

describe('product components', () => {
  beforeEach(() => {
    mockUseRouter.mockReset();
    mockUseSession.mockReset();
    mockSignIn.mockReset();
    mockSignOut.mockReset();
  });

  it('renders product cards when data exists', () => {
    render(
      <ProductView
        products={[
          {
            id: '1',
            name: 'Puma Palermo',
            price: 799000,
            image: '/puma.png',
            category: 'Sneakers',
          },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Daftar Produk' })).toBeInTheDocument();
    expect(screen.getByText('Puma Palermo')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
    expect(screen.getByText('Rp 799.000')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/produk/1');
  });

  it('renders skeleton state when products are empty', () => {
    const { container } = render(<ProductView products={[]} />);

    expect(screen.getByRole('heading', { name: 'Daftar Produk' })).toBeInTheDocument();
    expect(container.querySelector('h4')).toBeNull();
  });

  it('renders detail product info and price', () => {
    render(
      <DetailProduct
        products={{
          id: '2',
          name: 'Adidas Samba',
          price: 1200000,
          image: '/samba.png',
          category: 'Lifestyle',
        }}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Detail Produk' })).toBeInTheDocument();
    expect(screen.getByText('Adidas Samba')).toBeInTheDocument();
    expect(screen.getByText('Lifestyle')).toBeInTheDocument();
    expect(screen.getByText('Rp 1.200.000')).toBeInTheDocument();
  });

  it('renders navbar guest and calls signIn', () => {
    mockUseSession.mockReturnValue({ data: null });
    render(<Navbar />);

    const button = screen.getByRole('button', { name: 'Sign In' });
    expect(button).toBeInTheDocument();
    button.click();
    expect(mockSignIn).toHaveBeenCalled();
  });

  it('renders navbar authenticated and calls signOut', () => {
    mockUseSession.mockReturnValue({
      data: { user: { fullname: 'Alya', image: '/user.png' } },
    });
    render(<Navbar />);

    expect(screen.getByText(/Welcome, Alya/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Sign Out' });
    button.click();
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('shows navbar in AppShell except disabled routes', () => {
    mockUseSession.mockReturnValue({ data: null });

    mockUseRouter.mockReturnValue({ pathname: '/profile' });
    const visible = render(
      <AppShell>
        <div>child-content</div>
      </AppShell>,
    );
    expect(visible.getByText('child-content')).toBeInTheDocument();
    expect(visible.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();

    visible.unmount();

    mockUseRouter.mockReturnValue({ pathname: '/auth/login' });
    render(
      <AppShell>
        <div>child-content-hidden-nav</div>
      </AppShell>,
    );
    expect(screen.getByText('child-content-hidden-nav')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Sign In' })).not.toBeInTheDocument();
  });
});