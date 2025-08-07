export function getEnv<T>(key: string, defaultVal?: T) {
  const val = process.env[key];

  return (val ? val : defaultVal) as T;
}
