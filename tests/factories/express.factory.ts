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

export function createMockResponse(): {
  res: Partial<Response>;
  spies: {
    status: jest.Mock;
    json: jest.Mock;
    send: jest.Mock;
    end: jest.Mock;
  };
} {
  const res: Partial<Response> = {};

  const spies = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
  };

  res.status = spies.status;
  res.json = spies.json;
  res.send = spies.send;
  res.end = spies.end;

  return { res, spies };
}
