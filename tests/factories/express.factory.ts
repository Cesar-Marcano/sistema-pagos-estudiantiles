import { Request, Response } from "express";

export function createMockRequest(
  overrides: Partial<Request> = {}
): Partial<Request> {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...overrides,
  };
}

export function createMockResponse(overrides: Partial<Response> = {}): {
  res: Response;
  spies: {
    status: jest.Mock;
    json: jest.Mock;
    send: jest.Mock;
    end: jest.Mock;
    cookie: jest.Mock;
  };
} {
  const res: Partial<Response> = { ...overrides };

  const spies = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };

  res.cookie = spies.cookie;
  res.status = spies.status;
  res.json = spies.json;
  res.send = spies.send;
  res.end = spies.end;

  return { res: res as Response, spies };
}
