// ─── Mbolo Pay — API Helper & Utilities ─────────────────────────────────────

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

// ─── Auth helpers ────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('mbollopay_token');
}

export function getUser(): any | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('mbollopay_user');
  return data ? JSON.parse(data) : null;
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('mbollopay_token');
  localStorage.removeItem('mbollopay_user');
  window.location.href = '/connexion';
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

// ─── API fetch wrapper ───────────────────────────────────────────────────────

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
  const { auth = false, headers: customHeaders, ...rest } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_URL}${path}`, { headers, ...rest });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Erreur serveur' }));
    throw new Error(error.message || `Erreur ${res.status}`);
  }

  return res.json();
}

// ─── Format utilities ────────────────────────────────────────────────────────

/**
 * Format a number as XOF currency with thousands separators
 * e.g. 1500000 → "1 500 000 XOF"
 */
export function formatXOF(amount: number, showCurrency = true): string {
  const formatted = new Intl.NumberFormat('fr-FR').format(amount);
  return showCurrency ? `${formatted} XOF` : formatted;
}

/**
 * Calculate remaining days from now to a target date
 * Returns 0 if the date has passed
 */
export function daysRemaining(endDate: string | Date): number {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Get the French label + emoji for a category
 */
export function getCategoryLabel(category: string): { label: string; emoji: string } {
  const map: Record<string, { label: string; emoji: string }> = {
    SANTE:      { label: 'Santé',       emoji: '🏥' },
    RELIGION:   { label: 'Religion',    emoji: '🕌' },
    EDUCATION:  { label: 'Éducation',   emoji: '📚' },
    SPORT:      { label: 'Sport',       emoji: '⚽' },
    EVENEMENT:  { label: 'Événement',   emoji: '🎉' },
    COTISATION: { label: 'Cotisation',  emoji: '👥' },
    CADEAU:     { label: 'Cadeau',      emoji: '🎁' },
    URGENCE:    { label: 'Urgence',     emoji: '🚨' },
  };
  return map[category] || { label: category, emoji: '📌' };
}

/**
 * All categories for filter UI
 */
export const CATEGORIES = [
  { value: 'ALL',        label: 'Toutes',      emoji: '🌍' },
  { value: 'SANTE',      label: 'Santé',       emoji: '🏥' },
  { value: 'RELIGION',   label: 'Religion',    emoji: '🕌' },
  { value: 'EDUCATION',  label: 'Éducation',   emoji: '📚' },
  { value: 'SPORT',      label: 'Sport',       emoji: '⚽' },
  { value: 'EVENEMENT',  label: 'Événement',   emoji: '🎉' },
  { value: 'COTISATION', label: 'Cotisation',  emoji: '👥' },
  { value: 'CADEAU',     label: 'Cadeau',      emoji: '🎁' },
  { value: 'URGENCE',    label: 'Urgence',     emoji: '🚨' },
];

/**
 * Suggested donation amounts in XOF
 */
export const SUGGESTED_AMOUNTS = [1000, 2000, 5000, 10000];

/**
 * Calculate progress percentage
 */
export function progressPercent(collected: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(Math.round((collected / target) * 100), 100);
}

/**
 * Get the current page base URL for sharing
 */
export function getShareUrl(path: string): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${path}`;
}
