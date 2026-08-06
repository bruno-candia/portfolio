import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

/**
 * Host match, not substring match: `https://evil.example/?q=github.com` ends
 * with the domain nowhere near the authority, and `includes` says yes to it.
 */
export function isHost(url: string, domain: string): boolean {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }

  return host === domain || host.endsWith(`.${domain}`);
}
