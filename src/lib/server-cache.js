const globalMapKey = "__app_server_cache_v1";
const store = globalThis[globalMapKey] || new Map();
globalThis[globalMapKey] = store;

export async function getOrSet(key, ttlMs, fn) {
  const now = Date.now();
  const entry = store.get(key);
  if (entry && entry.expiry > now) return entry.value;

  const value = await fn();
  try {
    store.set(key, { value, expiry: now + ttlMs });
  } catch (e) {
    // Ignore cache set failures
  }
  return value;
}

export function clearCache() {
  store.clear();
}
