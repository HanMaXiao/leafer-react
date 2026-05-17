import { describe, it, expect } from 'vitest';
import { parseClassName } from '../classname-parser';

describe('parseClassName', () => {
  it('should parse bg-[#hex] to fill', () => {
    const result = parseClassName('bg-[#123456]');
    expect(result.fill).toBe('#123456');
  });

  it('should parse bg-{color} using Tailwind palette', () => {
    const result = parseClassName('bg-red-500');
    expect(result.fill).toBe('#ef4444');
  });

  it('should parse w-[Npx] to width', () => {
    const result = parseClassName('w-[200px]');
    expect(result.width).toBe(200);
  });

  it('should parse h-[Npx] to height', () => {
    const result = parseClassName('h-[50px]');
    expect(result.height).toBe(50);
  });

  it('should parse rounded-{size} to cornerRadius', () => {
    const result = parseClassName('rounded-lg');
    expect(result.cornerRadius).toBe(8);
  });

  it('should parse border-{color} using Tailwind palette', () => {
    const result = parseClassName('border-gray-300');
    expect(result.stroke).toBe('#d1d5db');
  });

  it('should parse opacity-{n} to opacity', () => {
    const result = parseClassName('opacity-80');
    expect(result.opacity).toBe(0.8);
  });

  it('should ignore unknown classes', () => {
    const result = parseClassName('flex items-center unknown-class');
    expect(Object.keys(result).length).toBe(0);
  });

  it('should parse multiple classes', () => {
    const result = parseClassName('bg-red-500 w-[100px] h-[50px] rounded-md opacity-80');
    expect(result.fill).toBe('#ef4444');
    expect(result.width).toBe(100);
    expect(result.height).toBe(50);
    expect(result.cornerRadius).toBe(6);
    expect(result.opacity).toBe(0.8);
  });

  it('should parse text-{color} to fill', () => {
    const result = parseClassName('text-blue-500');
    expect(result.fill).toBe('#3b82f6');
  });

  it('should parse rounded-full to large cornerRadius', () => {
    const result = parseClassName('rounded-full');
    expect(result.cornerRadius).toBe(9999);
  });

  it('should parse rounded-[Npx] to exact cornerRadius', () => {
    const result = parseClassName('rounded-[12px]');
    expect(result.cornerRadius).toBe(12);
  });
});
