type CounterRecord = {
  count: number;
  windowStart: number;
};

type LockRecord = {
  failures: number;
  windowStart: number;
  blockedUntil: number;
};

const REQUEST_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_IP = 20;

const FAILURE_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

declare global {
  // eslint-disable-next-line no-var
  var _loginRequestStore: Map<string, CounterRecord> | undefined;
  // eslint-disable-next-line no-var
  var _loginFailureStore: Map<string, LockRecord> | undefined;
}

const requestStore =
  global._loginRequestStore ?? new Map<string, CounterRecord>();
const failureStore = global._loginFailureStore ?? new Map<string, LockRecord>();

if (!global._loginRequestStore) global._loginRequestStore = requestStore;
if (!global._loginFailureStore) global._loginFailureStore = failureStore;

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}

export function checkRequestRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSec: number;
} {
  const now = Date.now();
  const existing = requestStore.get(ip);

  if (!existing || now - existing.windowStart >= REQUEST_WINDOW_MS) {
    requestStore.set(ip, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (existing.count >= MAX_REQUESTS_PER_IP) {
    const retryAfterSec = Math.ceil(
      (REQUEST_WINDOW_MS - (now - existing.windowStart)) / 1000
    );
    return { allowed: false, retryAfterSec: Math.max(1, retryAfterSec) };
  }

  existing.count += 1;
  requestStore.set(ip, existing);
  return { allowed: true, retryAfterSec: 0 };
}

export function checkLoginLock(lockKey: string): {
  blocked: boolean;
  retryAfterSec: number;
} {
  const now = Date.now();
  const record = failureStore.get(lockKey);
  if (!record) return { blocked: false, retryAfterSec: 0 };

  if (record.blockedUntil > now) {
    return {
      blocked: true,
      retryAfterSec: Math.ceil((record.blockedUntil - now) / 1000),
    };
  }

  if (now - record.windowStart >= FAILURE_WINDOW_MS) {
    failureStore.delete(lockKey);
    return { blocked: false, retryAfterSec: 0 };
  }

  return { blocked: false, retryAfterSec: 0 };
}

export function recordLoginFailure(lockKey: string): void {
  const now = Date.now();
  const record = failureStore.get(lockKey);

  if (!record || now - record.windowStart >= FAILURE_WINDOW_MS) {
    failureStore.set(lockKey, {
      failures: 1,
      windowStart: now,
      blockedUntil: 0,
    });
    return;
  }

  record.failures += 1;
  if (record.failures >= MAX_FAILURES) {
    record.blockedUntil = now + LOCKOUT_MS;
  }
  failureStore.set(lockKey, record);
}

export function clearLoginFailures(lockKey: string): void {
  failureStore.delete(lockKey);
}
