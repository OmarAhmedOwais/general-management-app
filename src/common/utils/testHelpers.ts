import { NextFunction, Request, Response } from 'express';

export const mockRequest = (data: any = {}): Partial<Request> => ({
  body: data.body || {},
  params: data.params || {},
  query: data.query || {},
  headers: data.headers || {},
});

export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = (): NextFunction => {
  return jest.fn() as NextFunction;
};
