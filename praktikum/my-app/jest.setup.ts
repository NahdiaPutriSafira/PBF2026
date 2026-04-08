import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    const resolvedSrc = typeof src === 'string' ? src : src?.src ?? '';
    return React.createElement('img', { src: resolvedSrc, alt, ...rest });
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) =>
    React.createElement('a', { href, ...rest }, children),
}));

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ children }: any) => React.createElement(React.Fragment, null, children),
}));

jest.mock('next/dist/client/script', () => ({
  __esModule: true,
  default: ({ children }: any) => React.createElement(React.Fragment, null, children),
}));

jest.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter-font' }),
  Roboto: () => ({ className: 'roboto-font' }),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: any) => React.createElement(React.Fragment, null, children),
}));