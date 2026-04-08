import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Home from '@/pages';
import About from '@/pages/about';
import Custom404 from '@/pages/404';
import AdminPage from '@/pages/admin';
import EditorPage from '@/pages/editor';
import ProfilePage from '@/pages/profile';
import EditProfilePage from '@/pages/profile/edit';
import AppSettingPage from '@/pages/setting/app';
import UserSettingPage from '@/pages/user';
import UserPasswordPage from '@/pages/user/password';
import BlogDetail from '@/pages/blog/[slug]';
import CategoryPage from '@/pages/category/[...slug]';
import ShopPage from '@/pages/shop/[[...slug]]';

const mockUseRouter = useRouter as jest.Mock;
const mockUseSession = useSession as jest.Mock;

describe('static and route pages', () => {
  beforeEach(() => {
    mockUseRouter.mockReset();
    mockUseSession.mockReset();
  });

  it('renders the home page content', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { name: 'Praktikum Next.js pages Router' })).toBeInTheDocument();
    expect(screen.getByText('Mahasiswa D4 Pengembangan Web')).toBeInTheDocument();
  });

  it('renders the about page content', () => {
    render(<About />);

    expect(screen.getByTestId('title')).toHaveTextContent('About Page');
    expect(screen.getByText('Nama: Nahdia Putri Safira')).toBeInTheDocument();
    expect(screen.getByText('NIM: 2341720015')).toBeInTheDocument();
    expect(screen.getByText('Program Studi: D4 Teknik Informatika')).toBeInTheDocument();
  });

  it('renders the 404 page with home link', () => {
    render(<Custom404 />);

    expect(screen.getByRole('heading', { name: '404 - Halaman Tidak Ditemukan' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Kembali ke Home' })).toHaveAttribute('href', '/');
  });

  it('renders admin, editor, and profile-style pages', () => {
    mockUseSession.mockReturnValue({ data: { user: { fullname: 'Nadia' } } });

    render(<AdminPage />);
    expect(screen.getByRole('heading', { name: 'Halaman Admin' })).toBeInTheDocument();

    render(<EditorPage />);
    expect(screen.getByRole('heading', { name: 'Halaman Editor' })).toBeInTheDocument();

    render(<ProfilePage />);
    expect(screen.getByText('Selamat Datang Nadia')).toBeInTheDocument();

    render(<EditProfilePage />);
    expect(screen.getByRole('heading', { name: 'Edit Profile' })).toBeInTheDocument();

    render(<AppSettingPage />);
    expect(screen.getByText('App Setting Page')).toBeInTheDocument();

    render(<UserSettingPage />);
    expect(screen.getByText('User Setting Page')).toBeInTheDocument();

    render(<UserPasswordPage />);
    expect(screen.getByText('Password User Page')).toBeInTheDocument();
  });

  it('renders blog, category, and shop routes from the router query', () => {
    mockUseRouter.mockReturnValue({ query: { slug: 'first-post' } });
    render(<BlogDetail />);
    expect(screen.getByText('Slug: first-post')).toBeInTheDocument();

    mockUseRouter.mockReturnValue({ query: { slug: ['fashion', 'shoes'] } });
    render(<CategoryPage />);
    expect(screen.getByRole('heading', { name: 'Halaman Category' })).toBeInTheDocument();
    expect(screen.getByText('fashion')).toBeInTheDocument();
    expect(screen.getByText('shoes')).toBeInTheDocument();

    mockUseRouter.mockReturnValue({ query: {} });
    render(<ShopPage />);
    expect(screen.getByText('Kategori: Semua Kategori')).toBeInTheDocument();
  });
});