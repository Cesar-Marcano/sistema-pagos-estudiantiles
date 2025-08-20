import { AsyncLocalStorage } from 'async_hooks';

type Store = {
  userId?: number;
};

const asyncLocalStorage = new AsyncLocalStorage<Store>();

export function runWithUserContext<T>(userId: number, fn: () => Promise<T> | T): Promise<T> | T {
  return asyncLocalStorage.run({ userId }, fn);
}

export function getUserId(): number | undefined {
  const store = asyncLocalStorage.getStore();
  return store?.userId;
}
