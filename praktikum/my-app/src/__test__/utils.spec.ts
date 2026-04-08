/** @jest-environment node */

import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { NextRequest } from 'next/server';

import fetcher from '@/utlis/swr/fetcher';

jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

const { getToken } = jest.requireMock('next-auth/jwt') as {
  getToken: jest.Mock;
};

const withAuthModule = require('../Middleware/withAuth') as {
  default: (middleware: any, requireAuth?: string[]) => any;
};
const middlewareModule = require('../middleware') as {
  MainMiddleware: (request: NextRequest) => Response;
};

const withAuth = withAuthModule.default;
const { MainMiddleware } = middlewareModule;

describe('fetcher utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns parsed json from fetch', async () => {
    const mockJson = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = jest.fn().mockResolvedValue({ json: mockJson } as any);

    const result = await fetcher('/api/hello');

    expect(global.fetch).toHaveBeenCalledWith('/api/hello');
    expect(result).toEqual({ ok: true });
  });
});

describe('withAuth middleware', () => {
  const passthrough = jest.fn(() => new Response('ok'));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login when route needs auth and token is missing', async () => {
    getToken.mockResolvedValue(null);
    const req = new NextRequest('http://localhost:3000/profile');
    const guarded = withAuth(passthrough as any, ['/profile']);

    const res = await guarded(req, {} as any);

    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/auth/login');
    expect(passthrough).not.toHaveBeenCalled();
  });

  it('redirects non-admin user from admin page', async () => {
    getToken.mockResolvedValue({ role: 'member' });
    const req = new NextRequest('http://localhost:3000/admin');
    const guarded = withAuth(passthrough as any, ['/admin']);

    const res = await guarded(req, {} as any);

    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://localhost:3000/');
  });

  it('passes through middleware when token exists on protected route', async () => {
    getToken.mockResolvedValue({ role: 'admin' });
    const req = new NextRequest('http://localhost:3000/admin');
    const guarded = withAuth(passthrough as any, ['/admin']);

    const res = await guarded(req, {} as any);

    expect(passthrough).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  it('MainMiddleware returns next response', () => {
    const req = new NextRequest('http://localhost:3000/');
    const res = MainMiddleware(req);

    expect(res.status).toBe(200);
  });
});