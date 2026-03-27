export function hashProps(props: Record<string, any>): string {
  const keys = Object.keys(props).sort();
  const values = keys.map(k => {
    const v = props[k];
    if (typeof v === 'function') {
      return '[function]';
    }
    if (typeof v === 'object' && v !== null) {
      return JSON.stringify(v);
    }
    return String(v);
  });
  return values.join('|');
}
