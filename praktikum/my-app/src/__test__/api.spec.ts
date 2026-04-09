/** @jest-environment node */

import { describe, expect, it, beforeEach, jest } from '@jest/globals';

jest.mock('../utlis/db/servicefirebase', () => ({
  signUp: jest.fn(),
  retrieveProducts: jest.fn(),
  retrieveDataByID: jest.fn(),
}));

const helloHandler = require('../pages/api/hello').default;
const registerHandler = require('../pages/api/register').default;
const revalidateHandler = require('../pages/api/revalidate').default;
const produkHandler = require('../pages/api/[[...produk]]').default;
const { getServerSideProps } = require('../pages/produk/server');
const { getStaticProps } = require('../pages/produk/static');

const { signUp, retrieveProducts, retrieveDataByID } = jest.requireMock(
  '../utlis/db/servicefirebase',
) as {
  signUp: jest.Mock;
  retrieveProducts: jest.Mock;
  retrieveDataByID: jest.Mock;
};

function createMockRes() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.revalidate = jest.fn().mockResolvedValue(undefined);
  return res;
}

describe('api handlers and data-fetching props', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REVALIDATE_TOKEN = 'secret-token';
  });

  it('returns expected payload from hello API', () => {
    const req: any = { method: 'GET' };
    const res = createMockRes();

    helloHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      name: 'John Doe',
      alamat: 'jl.suka suka no 1',
    });
  });

  it('handles register API for POST success and method-not-allowed', async () => {
    signUp.mockImplementation(async (_body, callback) => {
      callback({ status: 'success', message: 'created' });
    });
    const postReq: any = { method: 'POST', body: { email: 'a@a.com' } };
    const postRes = createMockRes();
    await registerHandler(postReq, postRes);
    expect(postRes.status).toHaveBeenCalledWith(200);

    const getReq: any = { method: 'GET' };
    const getRes = createMockRes();
    await registerHandler(getReq, getRes);
    expect(getRes.status).toHaveBeenCalledWith(405);

    signUp.mockImplementation(async (_body, callback) => {
      callback({ status: 'error', message: 'already exists' });
    });
    const failedReq: any = { method: 'POST', body: { email: 'a@a.com' } };
    const failedRes = createMockRes();
    await registerHandler(failedReq, failedRes);
    expect(failedRes.status).toHaveBeenCalledWith(400);
  });

  it('handles revalidate API token and query branches', async () => {
    const badReq: any = { query: { token: 'wrong', data: 'produk' } };
    const badRes = createMockRes();
    await revalidateHandler(badReq, badRes);
    expect(badRes.status).toHaveBeenCalledWith(401);

    const goodReq: any = { query: { token: 'secret-token', data: 'produk' } };
    const goodRes = createMockRes();
    await revalidateHandler(goodReq, goodRes);
    expect(goodRes.revalidate).toHaveBeenCalledWith('/produk/static');
    expect(goodRes.status).toHaveBeenCalledWith(200);

    const invalidReq: any = { query: { token: 'secret-token', data: 'other' } };
    const invalidRes = createMockRes();
    await revalidateHandler(invalidReq, invalidRes);
    expect(invalidRes.json).toHaveBeenCalledWith({
      revalidated: false,
      message: "Invalid query parameter. Expected 'data=produk'.",
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const errorReq: any = { query: { token: 'secret-token', data: 'produk' } };
    const errorRes = createMockRes();
    errorRes.revalidate.mockRejectedValue(new Error('revalidate failed'));
    await revalidateHandler(errorReq, errorRes);
    expect(errorRes.status).toHaveBeenCalledWith(500);
    expect(errorRes.send).toHaveBeenCalledWith({ revalidated: false });
    consoleSpy.mockRestore();
  });

  it('handles produk API list and detail branches', async () => {
    retrieveDataByID.mockResolvedValue({ id: '1', name: 'One' });
    retrieveProducts.mockResolvedValue([{ id: '2', name: 'Two' }]);

    const detailReq: any = { query: { produk: ['produk', '1'] } };
    const detailRes = createMockRes();
    await produkHandler(detailReq, detailRes);
    expect(retrieveDataByID).toHaveBeenCalledWith('products', '1');
    expect(detailRes.status).toHaveBeenCalledWith(200);

    const listReq: any = { query: { produk: ['produk'] } };
    const listRes = createMockRes();
    await produkHandler(listReq, listRes);
    expect(retrieveProducts).toHaveBeenCalledWith('products');
    expect(listRes.status).toHaveBeenCalledWith(200);
  });

  it('returns server and static props from fetched API data', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: [{ id: '1', name: 'x' }] }),
    } as any);

    const serverResult = await getServerSideProps();
    expect((serverResult as any).props.products).toHaveLength(1);

    const staticResult = await getStaticProps();
    expect((staticResult as any).props.products).toHaveLength(1);
    expect((staticResult as any).revalidate).toBe(10);
  });
});