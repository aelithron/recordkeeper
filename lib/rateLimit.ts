const map = new Map<string, { count: number; timestamp: number }>();

const MAX_REQS = 4;
const WINDOW_MS = 60_000;

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = map.get(ip);

  if (!entry || now - entry.timestamp > WINDOW_MS) {
    map.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= MAX_REQS) { return true; }
  entry.count++;
  return false;
}
