/**
 * Parse Tailwind CSS class names and convert to Leafer props.
 * Supports a minimal set of commonly-used utility classes.
 */

// Tailwind color palette (subset)
const TAILWIND_COLORS: Record<string, Record<string, string>> = {
  red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d' },
  blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
  green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d' },
  gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827' },
  white: { DEFAULT: '#ffffff' },
  black: { DEFAULT: '#000000' },
  yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12' },
  purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87' },
  orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12' },
};

// Tailwind rounded sizes
const TAILWIND_ROUNDED: Record<string, number> = {
  none: 0,
  sm: 2,
  DEFAULT: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

function resolveTailwindColor(colorName: string, shade: string): string | undefined {
  const palette = TAILWIND_COLORS[colorName];
  if (!palette) return undefined;
  return palette[shade] ?? palette['DEFAULT'];
}

function parseArbitraryValue(cls: string, prefix: string): string | undefined {
  // Match pattern like prefix-[value]
  const regex = new RegExp(`^${prefix}-\\[(.+)\\]$`);
  const match = cls.match(regex);
  return match ? match[1] : undefined;
}

export function parseClassName(className: string): Record<string, any> {
  if (!className) return {};

  const result: Record<string, any> = {};
  const classes = className.split(/\s+/).filter(Boolean);

  for (const cls of classes) {
    // bg-{color}-{shade} or bg-[#hex]
    if (cls.startsWith('bg-')) {
      const arbitrary = parseArbitraryValue(cls, 'bg');
      if (arbitrary) {
        result.fill = arbitrary;
        continue;
      }
      const parts = cls.slice(3).split('-');
      if (parts.length >= 2) {
        const color = resolveTailwindColor(parts[0], parts[parts.length - 1]);
        if (color) result.fill = color;
      }
      continue;
    }

    // text-{color}-{shade} or text-[#hex]
    if (cls.startsWith('text-')) {
      const arbitrary = parseArbitraryValue(cls, 'text');
      if (arbitrary) {
        result.fill = arbitrary;
        continue;
      }
      const parts = cls.slice(5).split('-');
      if (parts.length >= 2) {
        const color = resolveTailwindColor(parts[0], parts[parts.length - 1]);
        if (color) result.fill = color;
      }
      continue;
    }

    // w-[Npx] or w-[N]
    if (cls.startsWith('w-')) {
      const arbitrary = parseArbitraryValue(cls, 'w');
      if (arbitrary) {
        const num = parseFloat(arbitrary.replace('px', ''));
        if (!isNaN(num)) result.width = num;
      }
      continue;
    }

    // h-[Npx] or h-[N]
    if (cls.startsWith('h-')) {
      const arbitrary = parseArbitraryValue(cls, 'h');
      if (arbitrary) {
        const num = parseFloat(arbitrary.replace('px', ''));
        if (!isNaN(num)) result.height = num;
      }
      continue;
    }

    // rounded-{size} or rounded-[Npx]
    if (cls.startsWith('rounded')) {
      if (cls === 'rounded') {
        result.cornerRadius = TAILWIND_ROUNDED.DEFAULT;
        continue;
      }
      const arbitrary = parseArbitraryValue(cls, 'rounded');
      if (arbitrary) {
        const num = parseFloat(arbitrary.replace('px', ''));
        if (!isNaN(num)) result.cornerRadius = num;
        continue;
      }
      const size = cls.slice(8); // 'rounded-'.length = 8
      if (size in TAILWIND_ROUNDED) {
        result.cornerRadius = TAILWIND_ROUNDED[size];
      }
      continue;
    }

    // border-{color}-{shade}
    if (cls.startsWith('border-')) {
      const parts = cls.slice(7).split('-');
      if (parts.length >= 2) {
        const color = resolveTailwindColor(parts[0], parts[parts.length - 1]);
        if (color) result.stroke = color;
      }
      continue;
    }

    // opacity-{n}
    if (cls.startsWith('opacity-')) {
      const val = parseInt(cls.slice(8), 10);
      if (!isNaN(val) && val >= 0 && val <= 100) {
        result.opacity = val / 100;
      }
      continue;
    }
  }

  return result;
}
