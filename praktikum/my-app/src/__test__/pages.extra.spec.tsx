import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import App from '@/pages/_app';
import Document from '@/pages/_document';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import ProductDetailPage, { getServerSideProps } from '@/pages/produk/[produk]';
import LoginView from '../views/auth/login';
import RegisterView from '../views/auth/register';

const mockUseRouter = useRouter as jest.Mock;
const mockSignIn = signIn as jest.Mock;
const mockUseSession = useSession as jest.Mock;

beforeEach(() => {
  mockUseRouter.mockReset();
  mockUseSession.mockReset();
  mockUseRouter.mockReturnValue({ pathname: '/', push: jest.fn(), query: {} });
  mockUseSession.mockReturnValue({ data: null });
});

describe('core page wrappers and document', () => {
  it('renders _app with scripts, shell, and provided page component', () => {
    const DummyPage = ({ label }: { label: string }) => React.createElement('p', null, label);

    render(
      <App
        Component={DummyPage as any}
        pageProps={{ label: 'Rendered from app', session: null }}
        router={{} as any}
      />,
    );

    expect(screen.getByText('Rendered from app')).toBeInTheDocument();
  });

  it('renders custom document html structure', () => {
    const docElement = Document();

    expect(docElement).toBeDefined();
  });
});

describe('auth pages wrappers', () => {
  it('renders login page wrapper', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: 'Halaman login' })).toBeInTheDocument();
  });

  it('renders register page wrapper', () => {
    render(<RegisterPage />);
    expect(screen.getByRole('heading', { name: 'Halaman Register' })).toBeInTheDocument();
  });
});

describe('login view interactions', () => {
  beforeEach(() => {
    mockUseRouter.mockReset();
    mockSignIn.mockReset();
    mockUseRouter.mockReturnValue({ push: jest.fn(), query: {} });
  });

  it('supports login success flow', async () => {
    const push = jest.fn();
    mockUseRouter.mockReturnValue({ push, query: { callbackUrl: '/admin' } });
    mockSignIn.mockResolvedValue({ error: null });

    render(<LoginView />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@mail.com', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret123', name: 'password' },
    });
    const loginForm = screen.getByRole('button', { name: 'Login' }).closest('form') as HTMLFormElement;
    (loginForm as any).email = { value: 'user@mail.com' };
    (loginForm as any).password = { value: 'secret123' };

    fireEvent.submit(loginForm, {
      target: {
        email: { value: 'user@mail.com' },
        password: { value: 'secret123' },
      },
    });

    await waitFor(() => expect(mockSignIn).toHaveBeenCalledWith(
      'credentials',
      expect.objectContaining({
        redirect: false,
        email: 'user@mail.com',
        password: 'secret123',
        callbackUrl: '/admin',
      }),
    ));

    await waitFor(() => expect(push).toHaveBeenCalledWith('/admin'));
  });

  it('shows error when credentials login fails', async () => {
    mockSignIn.mockResolvedValue({ error: 'Invalid credential' });

    render(<LoginView />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@mail.com', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpass', name: 'password' },
    });
    const loginForm = screen.getByRole('button', { name: 'Login' }).closest('form') as HTMLFormElement;
    (loginForm as any).email = { value: 'user@mail.com' };
    (loginForm as any).password = { value: 'wrongpass' };
    fireEvent.submit(loginForm, {
      target: {
        email: { value: 'user@mail.com' },
        password: { value: 'wrongpass' },
      },
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid credential')).toBeInTheDocument();
    });
  });

  it('calls social sign in handlers', async () => {
    mockSignIn.mockResolvedValue({ error: null });

    render(<LoginView />);

    fireEvent.click(screen.getByRole('button', { name: 'sign in with google' }));
    fireEvent.click(screen.getByRole('button', { name: 'sign in with github' }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('google', expect.any(Object));
      expect(mockSignIn).toHaveBeenCalledWith('github', expect.any(Object));
    });
  });
});

describe('register view interactions', () => {
  beforeEach(() => {
    mockUseRouter.mockReset();
    mockUseRouter.mockReturnValue({ push: jest.fn(), query: {} });
    (global.fetch as any) = jest.fn();
  });

  it('validates required email and short password', async () => {
    render(<RegisterView />);

    fireEvent.change(screen.getByLabelText('Fullname'), {
      target: { value: 'Nadia', name: 'fullname' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123', name: 'password' },
    });

    const registerForm = screen.getByRole('button', { name: 'Register' }).closest('form') as HTMLFormElement;
    fireEvent.submit(registerForm);

    await waitFor(() => {
      expect(screen.getByText('Email wajib diisi!')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@mail.com', name: 'email' },
    });
    fireEvent.submit(registerForm);

    await waitFor(() => {
      expect(screen.getByText('Password minimal 6 karakter!')).toBeInTheDocument();
    });
  });

  it('handles register success and failure response', async () => {
    const push = jest.fn();
    mockUseRouter.mockReturnValue({ push, query: {} });

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 400 })
      .mockResolvedValueOnce({ status: 500 });

    render(<RegisterView />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'new@mail.com', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText('Fullname'), {
      target: { value: 'Nadia', name: 'fullname' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret123', name: 'password' },
    });
    const registerForm = screen.getByRole('button', { name: 'Register' }).closest('form') as HTMLFormElement;
    fireEvent.submit(registerForm);

    await waitFor(() => expect(push).toHaveBeenCalledWith('/auth/login'));

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'new@mail.com', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret123', name: 'password' },
    });
    fireEvent.submit(registerForm);

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'new@mail.com', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret123', name: 'password' },
    });
    fireEvent.submit(registerForm);

    await waitFor(() => {
      expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });
  });
});

describe('product detail page and SSR', () => {
  it('renders product detail wrapper', () => {
    render(
      <ProductDetailPage
        product={{
          id: '1',
          name: 'Puma Palermo',
          price: 799000,
          image: '/puma.png',
          category: 'Sneakers',
        }}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Detail Produk' })).toBeInTheDocument();
    expect(screen.getByText('Puma Palermo')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
  });

  it('returns props from product detail getServerSideProps', async () => {
    (global.fetch as any) = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          id: '9',
          name: 'Runner',
          price: 100000,
          image: '/runner.png',
          category: 'Sport',
        },
      }),
    });

    const result = await getServerSideProps({ params: { produk: '9' } } as any);

    expect((result as any).props.product).toEqual(
      expect.objectContaining({ id: '9', name: 'Runner' }),
    );
  });
});
