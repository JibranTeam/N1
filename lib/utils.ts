/* ═══════════════════════════════════════
   UTILITY FUNCTIONS
   Converts: _esc, _csvSafe, escapeHtml, csvSafe,
   debounce, highlight, mkBar, formatDate, getInitials,
   safeDownloadCSV, downloadFile, timeToMin, calDateStr
═══════════════════════════════════════ */

// ── XSS Escape (original: _esc + escapeHtml) ──
export function esc(s: string | null | undefined): string {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── CSV Injection Guard (original: _csvSafe + csvSafe) ──
export function csvSafe(val: string | number | null | undefined): string {
  const s = String(val == null ? '' : val);
  if (/^[=+\-@\t\r]/.test(s)) return "'" + s;
  if (s.includes(',') || s.includes('"') || s.includes('\n'))
    return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

// ── Debounce (original: debounce) ──
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── Search Highlight (original: highlight + hl) ──
// Returns JSX-safe highlighted HTML string
export function highlight(text: string, query: string): string {
  if (!query || !query.trim()) return esc(text);
  const escaped = esc(text);
  const re = new RegExp(
    '(' + esc(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
    'gi'
  );
  return escaped.replace(re, '<mark class="ht-search-highlight">$1</mark>');
}

// ── Snippet extractor for library search (original: snip) ──
export function snip(content: string, query: string, radius = 130): string {
  const i = content.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return content.slice(0, radius * 2);
  const s = Math.max(0, i - radius);
  const en = Math.min(content.length, i + radius);
  return (s > 0 ? '…' : '') + content.slice(s, en) + (en < content.length ? '…' : '');
}

// ── Get initials from name ──
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// ── Date formatting ──
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDateFull(date: Date): string {
  return `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatTime12(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

export function formatDateShort(date: Date): string {
  return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Calendar date string (original: calDateStr) — "YYYY-MM-DD"
export function calDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ISO date for today (original: APP_TODAY_ISO)
export function todayISO(): string {
  return calDateStr(new Date());
}

// Time string to minutes (original: timeToMin) — "9:30 AM" → 570
export function timeToMin(timeStr: string): number {
  const m = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!m) return 0;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const ampm = (m[3] || '').toUpperCase();
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

// Get Monday of the week containing date (original: calWeekMonday)
export function getWeekMonday(date: Date): Date {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0); // noon to avoid DST issues (original Bug #10 fix)
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // 0=Sun → go back 6
  d.setDate(d.getDate() + diff);
  return d;
}

// ── Greeting ──
export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// ── Safe CSV Download (original: safeDownloadCSV) ──
export function safeDownloadCSV(csv: string, filename: string): void {
  try {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('CSV download failed:', e);
  }
}

// ── General file download (original: downloadFile) ──
export function downloadFile(content: string, filename: string, mimeType = 'text/plain'): void {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Download failed:', e);
  }
}

// ── Status bar builder (original: mkBar) — returns JSX-friendly data ──
export function makeStatusBar(label: string, pct: number, val: string, color: string) {
  return { label, pct: Math.min(100, Math.max(0, pct)), val, color };
}

// ── Unique ID generator ──
let _idCounter = 0;
export function uid(prefix = 'id'): string {
  return `${prefix}-${++_idCounter}-${Date.now()}`;
}

// ── Month/Day name exports ──
export { DAY_NAMES, MONTH_NAMES, MONTH_SHORT };
